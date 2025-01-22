
    "chatSessions": {
      "document": {
        "id": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
        "type": "string",
        "messages": [
          {
            "payload": {
              "text": "string",
              "action": "string (nullable)"
            },
            "role": "string",
            "timestamp": "timestamp",
            "type": "string"
          }
        ],
        "user": {
          "id": "string (nullable)",
          "email": "string (nullable)",
          "fullName": "string (nullable)"
        }
      }
    }


    "global": {
      "document": {
        "dbSeeded": "boolean",
        "updatedAt": "timestamp"
      }
    }

    "toolSessions": {
      "document": {
        "sessionId": "string",
        "userId": "string",
        "toolId": "string",
        "startedAt": "timestamp",
        "endedAt": "timestamp (nullable)",
        "status": "string"
      }
    }

    "tools": {
      "document": {
        "toolId": "string",
        "name": "string",
        "description": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
        "status": "string"
      }
    }

    "users": {
      "document": {
        "userId": "string",
        "fullName": "string",
        "email": "string",
        "profilePicture": "string (nullable)",
        "role": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
        "preferences": "object (optional)"
      }
    }

