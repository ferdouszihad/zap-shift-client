# <u>ZAPSHIFT</u>

**A Complete B2C parcel management & Delivery System**

---

## <u>Overview</u>

**ZAPSHIFT** is a B2C parcel management and delivery system that streamlines booking, tracking, and delivery processes. It offers tracking, delivery, and digital proof of delivery, enhancing efficiency and customer satisfaction. Designed for businesses, it simplifies logistics while ensuring fast, reliable, and transparent delivery operations.

---

## <u>User Roles</u>

The **ZAPSHIFT** system is designed around three core user roles — **Merchant**, **Admin**, and **Delivery Agent** — each responsible for distinct stages in the parcel delivery process. Their coordinated efforts ensure a seamless end-to-end logistics experience across Bangladesh.

---

### 🧑‍💼 <u>1. Merchant</u>

**Merchants** are registered users who initiate parcel deliveries through the platform. Their responsibilities include:  
- **Creating and submitting parcel booking requests** with accurate type, weight, destination, and contact details.  
- **Making payment** based on dynamic pricing calculated by the system.  
- **Receiving a unique tracking ID** for each parcel.  
- **Monitoring parcel status in real-time.**  
- **Reviewing the service** after successful delivery to provide feedback and improve system quality.

---

### 🛠️ <u>2. Admin</u>

**Admins** are system operators responsible for managing parcel logistics and overseeing operational efficiency. Their key functions include:  
- **Assigning pickup agents and setting estimated delivery dates.**  
- **Managing inter-district parcel routing and coordinating warehouse operations.**  
- **Assigning delivery agents for last-mile delivery at the destination.**  
- **Monitoring parcel movement, agent performance, and overall system operations.**

---

### 🚚 <u>3. Delivery Agent</u>

**Delivery Agents** are responsible for the physical handling and movement of parcels.  
**📍 Within City**  
- **Collect parcels directly from merchants.**  
- **Update the system to reflect transit and delivery readiness.**  
- **Deliver parcels to customers**  

**🏙️ Outside City**  
- **Collect parcels directly from merchants**  
- **Submit collected parcels to the origin district warehouse.**  
- **Deliver parcels to customers**  

---

## <u>Dashboard Requirements</u>

### <u>Layouts</u>

The System will have a simple **Responsive Dashboard**.  
- **A Sidebar at the Left**  
    - Contain logo, User Info such as Name, Image, Email, Role  
    - Some Dynamic Navigation Links based on user Role  
    - Navigation for Public Interfaces (Home, Coverage, etc)  
    - **LogOut Button**, on Clicking It user will be logged out  
- **Pages at the Right**  
    - Pages will be show dynamically based on Routes

---

### <u>Merchant Home (Merchant)</u>

**States**: Show Some States about merchant all parcels  
- **unpaid**
- **paid**
- **ready-to-pickup**
- **in-transit**
- **reached-warehouse**
- **shipped**
- **ready-to-delivery**
- **delivered**

**Rechart (PI Chary) & User Info**:  
- Show User info such as name, email, photo URL and an edit button with Card Format at the left  
- Show a Pie Chart with states value at the right  
- **Demo**

---

### <u>Tracking</u>

All the documents from the tracking collection where the sender is the user. Show data in a 1 column notification format with a view details button

---

### <u>Add Parcel (Merchant)</u>

As the system is based on Door to Door delivery, Parcel needs both pickup and delivery location.  
- Will have a Heading & a subtitle  
- A Form with Multiple input field divided into 3 sub section  
    - **Parcel Info (3)**:  
        - type (document, non-document), title, weight (if type non-document)  
    - **Sender info (6)**:  
        - Name (prefilled), contact  
        - Select Region, Select WareHouse  
        - Address, Pick up Instruction  
    - **Receiver info (6)**:  
        - Name, contact  
        - Select Region, Select WareHouse  
        - Address, Delivery Instruction  

Each of the fields are required except parcel weight  
The cost will be calculated based on type, warehouse & weight.  
On Clicking Submit Show user a Toast with Delivery Cost and a confirmation button. By clicking confirm, save the parcel info into the database with a creation_date

---

### <u>Parcel To Pay (Merchant)</u>

- Show Total Parcel Found  
- Show a Search bar with a button to find parcels based on phone number.  
- Show all the parcels in a table format of user where sender is user & status is unpaid  
- Show important data such as, parcel Name, receiver info, cost, receiver address, etc.  
- Show some Actionable button  
    - **Pay** → Take user to (“/pay/parcelID”) payment page  
    - **Delete** → (will delete after confirmation)  
    - **View** → (“/pay/parcelID”) Take user to parcel details

---

### <u>Parcel Details Page (Merchant, Admin, Agent)</u>

Show users all the details of the parcel.  
if no parcel found show user that parcel not Found

---

### <u>Payment Page (Merchant)</u>

- **Total Charge to Pay**  
- Integrate a Card Based Payment System  
- On Successful payment  
    - Save Payment Info  
    - Add a 6 digit unique tracking_no to the parcel  
    - Insert a tracking_doc to the tracking_collection  
    - Show a Success Alert with Tracking_No & Transaction

---

### <u>Manage Parcel (Merchant)</u>

- A search feature based on receiver mobile number  
- Show all the parcel in a table format  
- Each row will have some required information with 2 button  
    - **Track**: will open a modal with tracking information / Take user to the tracking page  
    - **View**: will navigate users to parcel details information

---

### <u>Payment History (Merchant)</u>

Show all payments made by the user in a table format.  
The table will have payment info with Date Distance (ex. 13 days ago)

---

### <u>Discussion (Merchant)</u>

- Show an Add Review Button with an input field and a rating  
- Disable Add review Button if user have zero paid parcel  
- show all the reviews on the system  
- If the reviewer is a current user, show a 3 dot icon with a drop down, update, delete. Button. Implement, update and delete features.

---

### <u>User Settings (Merchant, Agent, Admin)</u>

A Page from where a user can change his info such as update his image, name, password.  
If Role Agent Show All the Data of Agent & Add update feature

---

## <u>Admin Dashboard</u>

---

### <u>Admin Home (Admin)</u>

**States**: Customer, Agents, Parcel Delivered, WareHouses, Earning  
**Recharts**: Show a Rechart of wareHouses with a graph of the payments / Parcel Count  
**Payment History**: Show all the payments in a notification format.

---

### <u>Manage Users (Admin)</u>

- Search feature based on user email address  
- Filter feature based on role  
- List of all users with role, merchant & admin on the database in a table format with conditional button Make Admin if Marchent, Make Marchent if Admin  
- On clicking Admin user role will be an admin with confirmation alert.

---

### <u>Manage Agent (Admin)</u>

- Show All agents in the system in a table  
- Add some conditional button based on status  
    - **Approve** (if pending / reject)  
    - **Reject** (If approved)

By clicking approve the Agent status will be approved & user role will be agent  
By clicking Reject the Agent status will be reject & user role will be merchant

---

### <u>Delivery Management (Admin)</u>

- Show States based on Parcel Status  
- Show all the Parcel Counts  
- A search System based on tracking_no  
- Show Parcel Info such as Origin, destination, Tracking_no, status, date, Actionable buttons (view, Manage)  
    - **View** will take user to parcel Details  
    - **Manage** will take user to manage Parcel Delivery Route  
    - Disable Manage Button (if status is unpaid)

- **unpaid**
- **paid**
- **ready-to-pickup**
- **in-transit**
- **reached-warehouse**
- **shipped**
- **ready-for-delivery**
- **delivered**

---

### <u>Manage Parcel Delivery (Admin)</u>

- Show Parcel Title as Title and a subtitle  
- Show Origin and Destination warhouse  
- Show parcel Details, Delivery Timeline (tracking Data)  
- Show Buttons & Cards based on status with a Ordered-List  
    - **Assign Parcel for PickUp** (enable it when status == paid)  
    - **Parcel Recived by Agent Card** (Show it when status == ready-to-pickup)  
    - **Confirm Parcel Recieved** (show it if warehouses is different & enable it when status == in-transit)  
    - **Ship Parcel** (show it if warehouses is different & enable it when status == reached-warehouse)  
    - **Assign Parcel for Delivery** (show it if warehouses is different & enable it when status == shipped)  
    - **Parcel Delivery by Agent Card** (Show it when status == ready-for-delivery)  
    - **Parecl Delivery Successfull Card** (Show it when status == delivered)

**Button Functionalities**  
- **Assign Parcel for PickUp**:  
    - Shoow a Modal with pickup Warhouse Info, Agent who works in the warehouse  
    - On Select an Agent Card Show Assign Button  
    - On Clicking Assign Agent email will be add on pickupAgent, status will be ready-to-pickup, and a Tracking Doc will be created with releavent status message & date

- **Confirm Parcel Recieved**  
    - On Clicking it status will be changed to “reached-warehouse”  
    - and a Tracking Doc will be created with releavent status message & date

- **Ship Parcel**  
    - On Clicking it status will be changed to “shipped”  
    - and a Tracking Doc will be created with releavent status message & date

- **Assign Parcel for Delivery**  
    - Shoow a Modal with delivery Warhouse Info, Agent who works in the warehouse  
    - On Select an Agent Card Show Assign Button  
    - On Clicking Assign Agent email will be add on deliveryAgent, status will be ready-for-delivery, a Tracking Doc will be created with relevant status message & date

---

## <u>Agent Dashboard</u>

---

### <u>Agent Home (Agent)</u>

**States**: Earning, Parcel to Deliver, Parcel to PickUp  
**Rechart (PI Chary) & User Info**:  
- Show AGent info with name, email, photo URL, and an edit button with Card Format at the left. on Clicking it take user to the user settings route.  
- Show a Pie Chart with states value at the right

**Current Task’s**: Show all the tracking docs where status is “ready-to-pickup” or “ready-for delivery” & deliveryAgent / pickUp agent is user with date.

---

### <u>Parcel-to-PickUp (Agent)</u>

Show Parcels where pickUp agent is user and status “ready-to-pickup” in a table format with address, sender contact and info and date  
Add a button **Confirm PickUp**. On Clicking It, show Modal with Confirm Tracking_no Input and Confirm button. On writing correct tracking_no do some action  
Parcel status will be changed to “in-transit”. a new tracking doc will be stored in tracking with a status message  
Agent Earning will be increased by 20.

---

### <u>Parcel-to-Delivery (Agent)</u>

Show Parcels where delivery agent is user and status “ready-for-delivery” in a table format with address, receiver contact and info, and date  
Add a button **Confirm Delivery**. On Clicking It, show Modal with Confirm Tracking_no Input and Confirm button. On writing correct tracking_no do some action  
Parcel status will be changed to “delivered”. A new tracking doc will be stored in tracking with a status message  
Agent Earning will be increased by 20.

