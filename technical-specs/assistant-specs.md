# Live Coding Session

## What we did in the last session: 
1. Reviewed our ticket and requirements
2. Reviewed Specs documentation and its importance in working with AI
3. Dug deeper into the implementation with AI / Windsurf
4. Created a db model for assistants
5. Created discovery page for assistants and connected to the db

## What we will do in this session:
1. Connect to the assistant chat endpoint
2. Modify chat history feature


# Assistant Features Specs

## Ticket / Project Brief: 
https://github.com/marvelai-org/marvel-platform/issues/200


## Starting / context for AI/Windsurf
1. AI assistant endpoint inputs/outputs - done
2. DB model of platform, especially chatSessions
3. Current implementation for tools page and chat feature

## Tasks
0. DB Model for assistants collection - done
1. Discovery page similar to home page - done
2. Connect to db - done
3. Chat page - done
4. Connect to endpoint
5. Connect to chat history (only history of that assistant)


## AI Backend Endpoint for assistant chat
https://marvel-ai-backend-sandbox-297484662473.us-east1.run.app/assistant-chat

Sample Input:
```JSON
{
   "assistant_inputs":{
      "assistant_group":"classroom_support",
      "assistant_name":"co_teacher",
      "user_info":{
         "user_name":"Aaron Sosa",
         "user_age":26,
         "user_preference":"Senior AI Engineer"
      },
      "messages":[
         {
            "role":"human",
            "type":"text",
            "timestamp":"string",
            "payload":{
               "text":"Give me insights for personalized teaching"
            }
         },
         {
            "role":"ai",
            "type":"text",
            "timestamp":null,
            "payload":{
               "text":"... AI Response"
            }
         },
         {
            "role":"human",
            "type":"text",
            "timestamp":"string",
            "payload":{
               "text":"Please, summarize what you said and translate that to spanish"
            }
         }
      ]
   }
}
```


Sample Response:
```JSON
{
  "data": [
    {
      "role": "ai",
      "type": "text",
      "timestamp": null,
      "payload": {
        "text": "... AI Response"
      }
    }
  ]
}
```


# DB Collection: chatSessions
{
  "messages": {
    "fields": {
      "type": {
        "type": "string"
      },
      "payload": {
        "fields": {
          "action": {
            "type": "string",
            "nullable": true
          },
          "text": {
            "type": "string"
          },
          "role": {
            "type": "string"
          },
          "timestamp": {
            "type": "timestamp"
          },
          "type": {
            "type": "string"
          }
        }
      },
      "updatedAt": {
        "type": "timestamp"
      },
      "user": {
        "fields": {
          "email": {
            "type": "string"
          },
          "fullName": {
            "type": "string"
          },
          "id": {
            "type": "string"
          }
        }
      }
    }
  }
}


# New DB Collection: assistants

Schema
```JSON
{
    "name": {
        "type": "string"
    },
    "groupName": {
        "type": "string"
    },
    "rating": {
        "type": "number"
    },
    "tag": {
        "type": "string"
    },
    "description": {
        "type": "string"
    },
    "isPopular": {
        "type": "boolean"
    }
}
```