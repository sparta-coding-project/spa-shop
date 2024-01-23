# Rest API Practice

### Quick Start
---
- Link : [http://35.199.172.246:3002](http://35.199.172.246:3002)
- API TEST : Insomnia, Thunder Client 등

### Library
---
- Express JS
- mongoose
- Joi
- CORS
- bcrypt

### Feature
---
- `/api/products`
    - `GET`
        - `find({})`를 이용해 products 데이터 읽어오기
    - `POST`
        - `create(newData)`를 이용해 products 데이터 추가하기
            ```json
                // 데이터 형식
                // body를 아래와 같은 형식으로 전달
                {
                    "title": "String",
                    "content": "String",
                    "author": "String",
                    "isSales": "String",
                    "password": "String" 
                }
            ```
        - Joi (유효성 검사)
            - 에러 처리
                - 데이터가 ""(빈 문자열)인 경우
                - isSales가 `"FOR_SALE"`, `"SOLD_OUT"`이 아닌 경우
                - 비밀번호 문자열의 길이가 4보다 작은 경우
- `/api/products/:productId`
    - `GET`
        - `find({})`를 이용해 products 데이터 읽어오기
    - `PATCH`
        - `findOne({_id: request.params.productId})`를 이용해, 특정 데이터 읽어오기
        - `bcrypt`의 `compare`메서드를 이용해, 기존 비밀번호와 `body`비밀번호 비교
        -  `updateOne({_id: request.params.productId}, {$set : {updateData}})`를 이용해 데이터 변경 사항 저장
    - `DELETE`
        - `findOne({_id: request.params.productId})`를 이용해, 특정 데이터 읽어오기
        - `bcrypt`의 `compare`메서드를 이용해, 기존 비밀번호와 `body`비밀번호 비교
        - `deleteOne({_id: request.params.productId})`를 이용해, 특정 데이터 제거
- 기타
    - 비밀번호 `bcrypt` 이용해 hashing 및 salting
