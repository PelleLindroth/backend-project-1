# **FAKE-HOAX API**
## Fake user accounts for our employees
***

### Login
### <span style="color:#FFB401;font-weight:bold">**POST**</span>  `/api/v1/login`
#### Example request body (JSON):
```json
{
	"email": "myemail@email.com",
	"password": "********"
}
```
#### Example response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR....."
}
```
### Get user info
### <span style="color:#0CBC52">**GET**</span> `/api/v1/me`
#### **Headers:**
Authorization: Bearer \<token...\>
#### Example response:
```json
{
  "email": "myemail@email.com",
  "id": 1
}
```
### Update user password
### <span style="color:#505050">**PATCH**</span> `/api/v1/me`
#### **Headers:**
Authorization: Bearer \<token...\>
#### Example request body (JSON):
```json
{
	"newPassword": "myNewPassword"
}
```
#### Example response:
```json
{
  "success": true,
  "message": "Password updated"
}
```
### Generate fake profile
### <span style="color:#0CBC52">**GET**</span> `/api/v1/generate`
#### **Headers:**
Authorization: Bearer \<token...\>
#### Example response:
```json
{
  "profile": {
    "name": "Luis Schumm",
    "dob": "1989-04-20",
    "profession": "Chief Paradigm Analyst",
    "hometown": "Lake Rickside",
    "trait": "Beer smoker",
    "image": "https://cdn.fakercloud.com/avatars/peachananr_128.jpg"
  },
  "link": "/user/eyJuYW1lIjoiTHVpcyB....."
}
```
### Generate fake profile with link
### <span style="color:#0CBC52">**GET**</span> `/api/v1/user/:base64`
#### **Headers:**
Authorization: Bearer \<token...\>
#### Example response:
```json
{
  "profile": {
    "name": "Leo Herman",
    "dob": "1992-07-10",
    "profession": "Principal Identity Supervisor",
    "hometown": "New Billhaven",
    "trait": "Gold lover",
    "image": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg"
  }
}
```