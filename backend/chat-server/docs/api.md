아, 이제 정확하게 이해했습니다. JSON 코드 부분을 ```json 으로 감싸서 마크다운 형식으로 제공해드리겠습니다. 아래는 수정된 명세서입니다.

# STOMP API 명세서

1. 채널 메시지 전송

Request:
•	Endpoint: /app/workspaces/{workspaceId}/channels/{channelId}
•	Message Body (JSON):
```
{
    "type": "SEND",
    "content": "Hello, this is a test message"
}
```

	•	Path Variables:
	•	{workspaceId}: 작업공간 ID
	•	{channelId}: 채널 ID
	•	Description: 클라이언트가 특정 채널에 메시지를 전송하면 서버는 해당 채널로 메시지를 전달합니다. 인증을 위해 헤더에 JWT 토큰이 포함됩니다.

Response:
•	Endpoint: /topic/workspaces/{workspaceId}/channels/{channelId}
•	Message Body (JSON):
```
{
    "type": "SEND",
    "channelId": "channelId",
    "user": {
                "userId": "userId",
                "userName": "username"
            },
    "content": "Hello, this is a test message",
    "createdAt": "2025-02-25T15:30:00.000000"
}
```
2. 채널 메시지 수정

Request:
•	Endpoint: /app/workspaces/{workspaceId}/channels/{channelId}/update
•	Message Body (JSON):
```
{
    "type": "UPDATE",
    "messageId": "someMessageId",
    "content": "Updated message content",
    "createdAt": "2025-02-25T16:00:00.000000"
}
```

	•	Path Variables:
	•	{workspaceId}: 작업공간 ID
	•	{channelId}: 채널 ID
	•	Description: 클라이언트가 특정 채널의 메시지를 수정할 때 사용합니다. 메시지 수정 요청은 메시지 ID와 함께 수정된 내용을 포함하여 서버에 전달됩니다. 수정된 메시지는 서버에서 처리 후 응답합니다.

Response:
•	Endpoint: /topic/workspaces/{workspaceId}/channels/{channelId}
•	Message Body (JSON):
```
{
    "type": "update",
    "messageId": "someMessageId",
    "user": {
                "userId": "userId",
                "userName": "username"
            },
    "content": "Updated message content",
    "isUpdated": true,
    "createdAt": "2025-02-25T15:30:00.000000",
    "updatedAt": "2025-02-25T16:00:00.000000"
}
```
3. 채널 메시지 삭제

Request:
•	Endpoint: /app/workspaces/{workspaceId}/channels/{channelId}/delete
•	Message Body (JSON):
```
{
    "type": "DELETE",
    "messageId": "someMessageId"
}
```

	•	Path Variables:
	•	{workspaceId}: 작업공간 ID
	•	{channelId}: 채널 ID
	•	Description: 클라이언트가 특정 채널에서 메시지를 삭제할 때 사용됩니다. 메시지 ID와 함께 삭제 요청을 서버에 전달합니다.

Response:
•	Endpoint: /topic/workspaces/{workspaceId}/channels/{channelId}
•	Message Body (JSON):
```
{
    "type": "delete",
    "messageId": "someMessageId",
    "code": "200",
    "message": "Message deleted successfully"
}
```
4. 채널 메시지 반응 (이모지)

Request:
•	Endpoint: /app/channels/{channelId}/reaction
•	Message Body (JSON):
```
{
    "type": "CREATE",
    "messageId": "someMessageId",
    "memberId": "userId",
    "workspaceId": "workspaceId",
    "channelId": "channelId",
    "emoji": "👍"
}
```

	•	Path Variables:
	•	{channelId}: 채널 ID
	•	Description: 클라이언트가 채널 메시지에 이모지 반응을 추가할 때 사용됩니다.

Response:
•	Endpoint: /topic/channels/{channelId}
•	Message Body (JSON):
```
{
    "type": "reaction",
    "messageId": "someMessageId",
    "emoji": "👍",
    "memberId": "userId"
}
```