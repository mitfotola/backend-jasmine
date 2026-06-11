# petshop-backend

## Setup & Run
1. cp .env.example .env
2. docker-compose up -d
3. npm install
4. npm run seed
5. npm run start:dev

## API Reference

| Method | Endpoint | Query Params | Response |
| --- | --- | --- | --- |
| GET | /pets | search, type, gender, minPrice, maxPrice, isAvailable, page, limit | { data, total, page, limit, totalPages } |
| GET | /pets/:id | none | Single pet document |

Notes:
- search matches name or breed with a case-insensitive regex.
- type accepts DOG, CAT, RABBIT, BIRD, FISH, OTHER.
- gender accepts MALE, FEMALE.
- isAvailable defaults to true when omitted.
- limit is capped at 50.
- GET /pets/:id returns 404 with Pet not found when the pet does not exist.

## Design Decisions
- The service builds a single dynamic Mongoose filter object so the query logic stays close to the database layer and remains easy to extend.
- Pagination uses find(filter).skip().limit() together with countDocuments(filter) so the total count always reflects the same filters as the page data.
- DTO validation keeps invalid query strings from reaching the service, while boolean coercion prevents the API from treating false as a truthy string.

## If I had more time
- Add authentication and an admin CRUD area for managing pets.
- Add image upload support instead of remote image URLs.
- Add unit and e2e tests around filtering, pagination, and not-found behavior.
- Add caching for popular list filters.

## AI Usage Log
- Project scaffolding and file generation were AI-assisted.
- API structure, seed dataset, and README content were AI-assisted.
- Manual review and final verification are still expected before shipping.