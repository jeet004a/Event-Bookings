Node.js File Upload Application
This Node.js application conatins event services backend. User can search the services (services like :- DJ, Venues, Hotels etc). Application admin can manage their services and orders.

Features
User can opt the services like book hotels, venues, DJ etc.
Admin can manage their services.
User can book services based on availability.


File Structure
The application consists of the following files:

/src/index.js: Sets up the Express app, connects to the database.

/src/express.js: Defins the api modules , which inclueds all bussiness logic's

/src/api/admin.js: Conatins application admin rotues.

/src/api/customer.js: Conatins application customer rotues.

/src/api/service.js: Conatins application event service rotues.



Installation
Clone the repository:

```bash git clone https://github.com/your-username/your-repo-name.git ```

Navigate to the project directory:

```bash cd your-repo-name ```

Install the dependencies:

```bash npm install ```

Set up your environment variables. Create a .env file and please follow env-setup.txt

For start you application please run the below command

```bash npm run dev ```