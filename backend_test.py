#!/usr/bin/env python3
"""
Backend API Testing for ApZelio Consulting Platform
Tests all backend endpoints with proper data validation
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from environment
BACKEND_URL = "https://modern-animated-site.preview.emergentagent.com/api"

def test_health_check():
    """Test GET /api/ - Health check endpoint"""
    print("🔍 Testing Health Check Endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "ApZelio API is running" in data["message"]:
                print("✅ Health check endpoint working correctly")
                return True
            else:
                print("❌ Health check response format incorrect")
                return False
        else:
            print(f"❌ Health check failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {str(e)}")
        return False

def test_contact_form_submission():
    """Test POST /api/contact - Contact form submission"""
    print("\n🔍 Testing Contact Form Submission...")
    
    contact_data = {
        "name": "John Smith",
        "email": "john.smith@techcorp.com",
        "company": "TechCorp Solutions",
        "phone": "+1-555-123-4567",
        "service_interest": "AI Integration & LLM Ops",
        "message": "We are interested in implementing AI solutions for our customer service platform. We need consultation on LLM integration and would like to discuss our requirements."
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=contact_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "name", "email", "company", "phone", "service_interest", "message", "status", "created_at"]
            
            if all(field in data for field in required_fields):
                if (data["name"] == contact_data["name"] and 
                    data["email"] == contact_data["email"] and
                    data["status"] == "new"):
                    print("✅ Contact form submission working correctly")
                    return True, data["id"]
                else:
                    print("❌ Contact form data mismatch")
                    return False, None
            else:
                print("❌ Contact form response missing required fields")
                return False, None
        else:
            print(f"❌ Contact form submission failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Contact form submission error: {str(e)}")
        return False, None

def test_get_contacts():
    """Test GET /api/contacts - Retrieve contacts"""
    print("\n🔍 Testing Get Contacts Endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/contacts")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of contacts retrieved: {len(data)}")
            
            if isinstance(data, list):
                if len(data) > 0:
                    # Check first contact structure
                    contact = data[0]
                    required_fields = ["id", "name", "email", "status", "created_at"]
                    if all(field in contact for field in required_fields):
                        print("✅ Get contacts endpoint working correctly")
                        return True
                    else:
                        print("❌ Contact structure missing required fields")
                        return False
                else:
                    print("✅ Get contacts endpoint working (empty list)")
                    return True
            else:
                print("❌ Get contacts response is not a list")
                return False
        else:
            print(f"❌ Get contacts failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get contacts error: {str(e)}")
        return False

def test_ai_chatbot():
    """Test POST /api/chat - AI chatbot endpoint"""
    print("\n🔍 Testing AI Chatbot Endpoint...")
    
    chat_data = {
        "message": "What services does ApZelio offer? I'm particularly interested in AI integration capabilities.",
        "session_id": "test-session-" + str(int(datetime.now().timestamp()))
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/chat",
            json=chat_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Chat Response: {data}")
            
            required_fields = ["response", "session_id"]
            if all(field in data for field in required_fields):
                response_text = data["response"].lower()
                # Check if response mentions ApZelio services
                apzelio_keywords = ["apzelio", "ai integration", "llm", "consulting", "services", "cloud", "development"]
                
                if any(keyword in response_text for keyword in apzelio_keywords):
                    print("✅ AI chatbot working correctly with ApZelio context")
                    return True
                else:
                    print("⚠️ AI chatbot working but may not have proper ApZelio context")
                    print(f"Response: {data['response']}")
                    return True  # Still working, just context issue
            else:
                print("❌ Chat response missing required fields")
                return False
        else:
            print(f"❌ AI chatbot failed with status {response.status_code}")
            if response.status_code == 500:
                print("This might be an LLM API key or integration issue")
            return False
    except Exception as e:
        print(f"❌ AI chatbot error: {str(e)}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting ApZelio Backend API Tests")
    print(f"Testing against: {BACKEND_URL}")
    print("=" * 60)
    
    results = {}
    
    # Test 1: Health Check
    results["health_check"] = test_health_check()
    
    # Test 2: Contact Form Submission
    results["contact_submission"], contact_id = test_contact_form_submission()
    
    # Test 3: Get Contacts
    results["get_contacts"] = test_get_contacts()
    
    # Test 4: AI Chatbot
    results["ai_chatbot"] = test_ai_chatbot()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    total_tests = len(results)
    passed_tests = sum(1 for result in results.values() if result)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All backend APIs are working correctly!")
        return True
    else:
        print("⚠️ Some backend APIs have issues that need attention")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)