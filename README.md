# Backend66

# CRUD API Documentation by Dr.Chanakarn Kingkaew (Aj.Oak)

นี่คือ API แบบ CRUD (Create, Read, Update, Delete) อย่างง่ายที่พัฒนาด้วย Node.js และ Express โดย API นี้ใช้โครงสร้างข้อมูลในหน่วยความจำ (in-memory data structure) เพื่อจัดเก็บรายการ และแสดงให้เห็นหลักการพื้นฐานของ RESTful อย่างชัดเจน โปรดศึกษาวิธีการทำ API Documentation

---

## Base URL

http://localhost:3000


---

## Endpoints

### 1. Create an Item
**HTTP Method**: `POST`  
**Endpoint**: `/items`

**Description**: Adds a new item to the list.

#### Request Body
```json
{
  "name": "string"
}
```
#### Response
- 201 Created:
```json
{
  "id": 1,
  "name": "Apple"
}
```
- 400 Bad Request:
```json
{ "error": "Name is required" }
```

### 2. Get All Items
**HTTP Method**: `GET`  
**Endpoint**: `/items`


**Description**: Retrieves all items in the list.

#### Response
- 200 OK:
```json
[
  { "id": 1, "name": "Apple" },
  { "id": 2, "name": "Banana" }
]
```
### 3. Get an Item by ID
**HTTP Method**: `GET`  
**Endpoint**: `/items/:id`


**Description**: Retrieves a specific item by its unique ID.
**Path Parameter**
- `id` (integer): The ID of the item to retrieve.
#### Response
- 200 OK:
```json
{
  "id": 1,
  "name": "Apple"
}
```
- 404 Not Found:
```json
{ "error": "Item not found" }
```
### 4. Update an Item
**HTTP Method**: `PUT`  
**Endpoint**: `/items/:id`


**Description**: Updates the name of a specific item by its unique ID.   
**Path Parameter**
- `id` (integer): The ID of the item to update.
#### Request Body
```json
{
  "name": "string"
}
```
#### Response
- 200 OK:
```json
{
  "id": 1,
  "name": "Banana"
}
```
- 404 Bad Request:
```json
{
  "error": "Name is required"
}
```
- 404 Not Found:
```json
{
  "error": "Item not found"
}
```
### 5. Delete an Item
**HTTP Method**: `DELETE`  
**Endpoint**: `/items/:id`


**Description**: Deletes a specific item by its unique ID.   
**Path Parameter**
- `id` (integer): The ID of the item to delete.
#### Response
- 204 No Content: Successfully deleted.
- 404 Not Found:
```json
{
  "error": "Item not found"
}
```
## Status Codes

| Status Code      | Description                              |
|-------------------|------------------------------------------|
| **200 OK**       | Request was successful.                 |
| **201 Created**  | New resource successfully created.      |
| **204 No Content**| Resource successfully deleted.          |
| **400 Bad Request**| Invalid input or missing data.         |
| **404 Not Found** | Resource not found.                    |


## Usage Examples
### Create an Item
#### Request:
```http
POST /items HTTP/1.1
Content-Type: application/json

{
  "name": "Apple"
}
```
#### Response:
```json
{
  "id": 1,
  "name": "Apple"
}
```

### Get All Items
#### Request:
```http
GET /items HTTP/1.1
```
#### Response:
```json
[
  { "id": 1, "name": "Apple" },
  { "id": 2, "name": "Banana" }
]
```
### Update an Item
#### Request:
```http
PUT /items/1 HTTP/1.1
Content-Type: application/json

{
  "name": "Orange"
}
```
#### Response:
```json
{
  "id": 1,
  "name": "Orange"
}
```
### Delete an Item
#### Request:
```http
DELETE /items/1 HTTP/1.1
```
#### Response: `204 No Content`



