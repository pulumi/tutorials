import requests
import json
import sys

base_url = sys.argv[1]
env = sys.argv[2]
apiKey = sys.argv[3]

url = ""

if "dev" in env.lower():
    url = f"{base_url}/dev"
elif "test" in env.lower():
    url = f"{base_url}/test"
else:
    raise Exception("Please provide a valid environment (dev or test)."

payload = json.dumps({})
headers = {
  'ApiKey': apiKey,
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
