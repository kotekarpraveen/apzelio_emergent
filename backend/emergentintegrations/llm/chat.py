import json
import asyncio
import aiohttp

class UserMessage:
    def __init__(self, text):
        self.text = text

class LlmChat:
    def __init__(self, api_key, system_message=None, session_id=None):
        self.api_key = api_key
        self.system_message = system_message
        self.session_id = session_id
        self.messages = []
        if system_message:
            self.messages.append({"role": "system", "content": system_message})
        self.model = "gpt-4o-mini"

    def with_model(self, provider, model_name):
        # provider is ignored in this mock, model_name is used for OpenAI
        self.model = model_name
        return self

    async def send_message(self, user_message):
        content = user_message.text
        self.messages.append({"role": "user", "content": content})
        
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": self.model,
            "messages": self.messages,
            "response_format": { "type": "json_object" }
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=headers, json=data) as response:
                    if response.status == 200:
                        result = await response.json()
                        ai_content = result['choices'][0]['message']['content']
                        self.messages.append({"role": "assistant", "content": ai_content})
                        return ai_content
                    else:
                        error_text = await response.text()
                        return f"Error from AI Provider: {response.status}. Please check your API key."
        except Exception as e:
            return f"Connection Error: {str(e)}"
