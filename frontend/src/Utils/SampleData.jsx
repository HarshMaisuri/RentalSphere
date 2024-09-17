export const openServiceRequestsData = [
  {
    id: 1,
    serviceTitle: "Plumbing Issue",
    tenant: {
      name: "John Doe",
      unit: "Unit 101",
    },
    serviceDescription: "There is a leak under the kitchen sink.",
    date: "2024-02-21",
  },
  {
    id: 2,
    serviceTitle: "Electrical Problem",
    tenant: {
      name: "Jane Smith",
      unit: "Unit 202",
    },
    serviceDescription: "The lights in the living room are flickering.",
    date: "2024-02-20",
  },
  {
    id: 3,
    serviceTitle: "Broken Window",
    tenant: {
      name: "Michael Johnson",
      unit: "Unit 303",
    },
    serviceDescription: "One of the windows in the bedroom is cracked.",
    date: "2024-02-19",
  },
  {
    id: 4,
    serviceTitle: "Appliance Repair",
    tenant: {
      name: "Emily Wilson",
      unit: "Unit 404",
    },
    serviceDescription: "The microwave in the kitchen is not working.",
    date: "2024-02-18",
  },
  {
    id: 5,
    serviceTitle: "HVAC Maintenance",
    tenant: {
      name: "Sarah Brown",
      unit: "Unit 505",
    },
    serviceDescription: "The heating system in the apartment needs servicing.",
    date: "2024-02-17",
  },
];

export const outstandingBalancesData = [
  { name: "Samuel Llyod", unit: "Unit 810", balance: 2540 },
  { name: "George Harrison", unit: "Unit 920", balance: 1400 },
  { name: "Emily Johnson", unit: "Unit 725", balance: 1850 },
  { name: "Michael Smith", unit: "Unit 615", balance: 3200 },
  { name: "Emma Davis", unit: "Unit 532", balance: 950 },
  // Add more data as needed
];

export const sidebarMenuItems = [
  { name: "Dashboard", path: "overview", icon: "FiHome" },
  { name: "Announcements", path: "announcements", icon: "TbSpeakerphone" },
  {
    name: "Tenant Approvals",
    path: "tenantapprovals",
    icon: "IoCheckboxOutline",
  },
  // {
  //   name: "Rent Management",
  //   path: "rentmanagement",
  //   icon: "FaRegMoneyBillAlt",
  // },
  {
    name: "Lease Management",
    path: "leasemanagement",
    icon: "IoDocumentOutline",
  },
  {
    name: "Violation Log",
    path: "violationlog",
    icon: "AiTwotoneFileExclamation",
  },
  // { name: "Service Requests", path: "servicerequests", icon: "FiTool" },
];

export const sampleAnnouncements = [
  {
    id: 1,
    title: "Important Announcement 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2024-02-23",
  },
  {
    id: 2,
    title: "Important Announcement 2",
    content:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    date: "2024-02-22",
  },
  {
    id: 3,
    title: "Important Announcement 3",
    content:
      "Nulla facilisi. Integer fermentum elit in ipsum faucibus, eget scelerisque nulla fermentum.",
    date: "2024-02-21",
  },
];

export const tenantApprovalsData = [
  {
    tenantName: "John Doe",
    email: "john.doe@example.com",
    unit: "A101",
    moveInDate: "2024-03-01",
    duration: "12 months",
    reason: "Looking for a new rental home",
    date: "2024-02-24",
  },
  {
    tenantName: "Jane Smith",
    email: "jane.smith@example.com",
    unit: "B203",
    moveInDate: "2024-04-01",
    duration: "6 months",
    reason: "Relocating for work",
    date: "2024-02-23",
  },
  // Add more tenant request objects as needed
];

export const sampleTenantReqs = [
  {
    tenantID: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    details: "Request details for John Doe",
  },
  {
    tenantID: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@gmail.com",
    details: "Request details for Jane Smith",
  },
];

export const sampleListingsData = [
  {
    id: 1,
    numBedrooms: "2",
    numBathrooms: "1",
    title: "Central Park View Apartment",
    address: "123 Central Park West, New York, NY 10019, United States",
    listingType: "Apartment",
    furnishType: "Fully Furnished",
    area: "900 sq. ft.",
    rate: "$2.50/sq.ft",
    owner: "Jane Smith",
    price: "2250",
    imageURL:
      "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg",
    propertyDescription:
      "Enjoy breathtaking views of Central Park from this beautifully furnished apartment. Conveniently located near all amenities.",
    details: {
      utils: "No",
      wifi: "No",
      parking: "3+",
      agreement: "1 Year",
      moveInDate: "April 1 2024",
      petFriendly: "Yes",
      appliances: "No",
      airc: "Yes",
      outdoor: "Yes",
      smoke: "No",
    },
  },
  {
    id: 2,
    numBedrooms: "4",
    numBathrooms: "2.5",
    title: "Luxury Penthouse Downtown",
    address: "456 Broadway, New York, NY 10012, United States",
    listingType: "Penthouse",
    furnishType: "Fully Furnished",
    area: "3000 sq. ft.",
    rate: "$4.80/sq.ft",
    owner: "Michael Johnson",
    price: "14400",
    imageURL:
      "https://cdn.pixabay.com/photo/2020/06/27/16/40/apartment-5346460_1280.jpg",
    propertyDescription:
      "Experience ultimate luxury living in this stunning downtown penthouse. High-end finishes and panoramic city views.",
    details: {
      utils: "Yes",
      wifi: "Yes",
      parking: "2",
      agreement: "2 Years",
      moveInDate: "Immediate",
      petFriendly: "No",
      appliances: "Yes",
      airc: "Yes",
      outdoor: "No",
      smoke: "Yes",
    },
  },
  {
    id: 3,
    numBedrooms: "1",
    numBathrooms: "1",
    title: "Cozy Studio in SoHo",
    address: "789 Houston St, New York, NY 10012, United States",
    listingType: "Studio",
    furnishType: "Partially Furnished",
    area: "600 sq. ft.",
    rate: "$3.20/sq.ft",
    owner: "Emily Davis",
    price: "1920",
    imageURL:
      "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
    propertyDescription:
      "Charming studio apartment located in the heart of SoHo. Close to trendy cafes, boutiques, and public transportation.",
    details: {
      utils: "Yes",
      wifi: "Yes",
      parking: "Street",
      agreement: "6 Months",
      moveInDate: "Flexible",
      petFriendly: "Yes",
      appliances: "Partial",
      airc: "No",
      outdoor: "No",
      smoke: "No",
    },
  },
  {
    id: 4,
    numBedrooms: "3",
    numBathrooms: "2",
    title: "Spacious Family Home in Brooklyn",
    address: "10 Smith St, Brooklyn, NY 11201, United States",
    listingType: "House",
    furnishType: "Unfurnished",
    area: "2000 sq. ft.",
    rate: "$2.00/sq.ft",
    owner: "David Wilson",
    price: "4000",
    imageURL:
      "https://cdn.pixabay.com/photo/2018/01/26/08/15/dining-room-3108037_1280.jpg",
    propertyDescription:
      "Ideal family home featuring spacious rooms and a backyard. Located in a peaceful neighborhood close to schools and parks.",
    details: {
      utils: "Yes",
      wifi: "No",
      parking: "2",
      agreement: "1 Year",
      moveInDate: "May 1 2024",
      petFriendly: "Yes",
      appliances: "Partial",
      airc: "No",
      outdoor: "Yes",
      smoke: "No",
    },
  },
  {
    id: 5,
    numBedrooms: "2",
    numBathrooms: "1.5",
    title: "Modern Condo with City Views",
    address: "1010 Avenue of the Americas, New York, NY 10018, United States",
    listingType: "Condo",
    furnishType: "Fully Furnished",
    area: "1200 sq. ft.",
    rate: "$3.80/sq.ft",
    owner: "Daniel Brown",
    price: "4560",
    imageURL:
      "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg",
    propertyDescription:
      "Contemporary condo offering stunning views of the city skyline. Fully equipped with modern amenities and stylish decor.",
    details: {
      utils: "Yes",
      wifi: "Yes",
      parking: "Garage",
      agreement: "2 Years",
      moveInDate: "Immediate",
      petFriendly: "No",
      appliances: "Yes",
      airc: "Yes",
      outdoor: "Balcony",
      smoke: "No",
    },
  },
  {
    id: 6,
    numBedrooms: "3",
    numBathrooms: "2.5",
    title: "Elegant Townhouse in Upper East Side",
    address: "20 East 65th Street, New York, NY 10065, United States",
    listingType: "Townhouse",
    furnishType: "Partially Furnished",
    area: "2500 sq. ft.",
    rate: "$5.00/sq.ft",
    owner: "Olivia Taylor",
    price: "12500",
    imageURL:
      "https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg",
    propertyDescription:
      "Sophisticated townhouse with classic architecture and upscale interiors. Located in a prestigious neighborhood with easy access to elite shopping and dining.",
    details: {
      utils: "Yes",
      wifi: "Yes",
      parking: "1",
      agreement: "1 Year",
      moveInDate: "Flexible",
      petFriendly: "No",
      appliances: "Yes",
      airc: "Yes",
      outdoor: "Terrace",
      smoke: "No",
    },
  },
  {
    id: 7,
    numBedrooms: "4",
    numBathrooms: "3",
    title: "Spacious Loft in Greenwich Village",
    address: "30 Jones Street, New York, NY 10014, United States",
    listingType: "Loft",
    furnishType: "Unfurnished",
    area: "1800 sq. ft.",
    rate: "$4.00/sq.ft",
    owner: "Sophia Clark",
    price: "7200",
    imageURL:
      "https://cdn.pixabay.com/photo/2016/11/30/08/48/bedroom-1872196_1280.jpg",
    propertyDescription:
      "Expansive loft space featuring high ceilings and exposed brick walls. Located in the vibrant Greenwich Village neighborhood with easy access to restaurants, bars, and entertainment.",
    details: {
      utils: "No",
      wifi: "Yes",
      parking: "Street",
      agreement: "1 Year",
      moveInDate: "April 15 2024",
      petFriendly: "Yes",
      appliances: "Partial",
      airc: "Yes",
      outdoor: "No",
      smoke: "No",
    },
  },
];

export const sampleRequestData = [
  {
    id: "d5e3",
    requestSubject: "New Req",
    requestType: "New Req type",
    date: "24 Feb 2024",
    requestMessage: "New Req type Message New Req type Message",
  },
  {
    id: "caee",
    requestSubject: "Test 1",
    requestType: "Test 1 type",
    date: "24 Feb 2024",
    requestMessage: "Test 1 message Test 1 messageTest 1 messageTest 1 message",
  },
  {
    id: "2fdd",
    requestSubject: "Testst",
    requestType: "Testst",
    date: "24 Feb 2024",
    requestMessage: "TeststTeststTeststTestst",
  },
];

export const sampleViolationLogData = [
  {
    title: "Title lorem",
    description:
      "1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    monetary: "200",
    personalComment: "Lorem Ipsum is simply",
    damageIntensity: "Moderate",
  },
  {
    title: "Title lorem",
    description:
      "2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    monetary: "200",
    personalComment: "Lorem Ipsum is simply",
    damageIntensity: "Minor",
  },
  {
    title: "Title lorem",
    description:
      "3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    monetary: "200",
    personalComment: "Lorem Ipsum is simply",
    damageIntensity: "Severe",
  },
  {
    title: "Title lorem",
    description:
      "4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    monetary: "200",
    personalComment: "Lorem Ipsum is simply",
    damageIntensity: "Moderate",
  },
  {
    title: "Title lorem",
    description:
      "4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the",
    monetary: "200",
    personalComment: "Lorem Ipsum is simply",
    damageIntensity: "Minor",
  },
];

export const sampleServiceReqData = [
  {
    id: "d5e3",
    requestSubject: "New Req",
    requestType: "New Req type",
    requestMessage: "New Req type Message New Req type Message",
  },
  {
    id: "caee",
    requestSubject: "Test 1",
    requestType: "Test 1 type",
    requestMessage: "Test 1 message Test 1 messageTest 1 messageTest 1 message",
  },
  {
    id: "2fdd",
    requestSubject: "Testst",
    requestType: "Testst",
    requestMessage: "TeststTeststTeststTestst",
  },
];

export const sampleContactData = [
  {
    id: "1",
    name: "Selma Lowery",
    phoneNumber: "417-743-5425",
    email: "selma@gmail.com",
    skill: "Plumber",
    companyName: "Clean Xpress",
  },
  {
    id: "2",
    name: "Beverly Mendez",
    phoneNumber: "778-232-3127",
    email: "davidgarcia@hornheath.com",
    skill: "Electrician",
    companyName: "Horn-Heath",
  },
  {
    id: "3",
    name: "Stephen Riddle",
    phoneNumber: "781-586-2754",
    email: "stephen@maharaj.com",
    skill: "Cook",
    companyName: "Maharaj",
  },
  {
    id: "4",
    name: "Abigail Armstrong",
    phoneNumber: "585-923-6157",
    email: "abigail@terry.com",
    skill: "Home cleaner",
    companyName: "Terry Inc",
  },
  {
    id: "5",
    name: "Heather Armstrong",
    phoneNumber: "417-743-5425",
    email: "heather@jones.com",
    skill: "Insurance",
    companyName: "Jones LLC",
  },
  {
    id: "6",
    name: "Zephr Duncan",
    phoneNumber: "317-775-7161",
    email: "zephr@roriguez.com",
    skill: "Carpet cleaner",
    companyName: "Rodriguez-Simpson",
  },
  {
    id: "7",
    name: "James Williams",
    phoneNumber: "317-775-7161",
    email: "james@cohen.com",
    skill: "plumber",
    companyName: "Cohen, Schmitt and Gordon",
  },
  {
    id: "8",
    name: "Dakota Madden",
    phoneNumber: "099-115-2353",
    email: "dakota@smith.com",
    skill: "window cleaner",
    companyName: "Smith, Meyer and Williams",
  },
  {
    id: "9",
    name: "Taylor Hubers",
    phoneNumber: "317-775-7161",
    email: "taylor@clark.com",
    skill: "taxi service",
    companyName: "Clark, Nichols and Wright",
  },
  {
    id: "10",
    name: "Brown LLC",
    phoneNumber: "317-775-7161",
    email: "brown@brown.com",
    skill: "cobler",
    companyName: "Brown LLC",
  },
]

export const sampleDocumentData = [
  {
    id: "1",
    documentName: "Document 1",
    documentLink:
      "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf",
    createdDate: "22 Fab 2024",
  },
  {
    id: "2",
    documentName: "Document 2",
    documentLink:
      "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf",
    createdDate: "22 Fab 2024",
  },
  {
    id: "3",
    documentName: "Document 3",
    documentLink:
      "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf",
    createdDate: "22 Fab 2024",
  },
];

export const sampleLeaseData = [
  {
    id: "1",
    documentName: "Document 1",
    documentLink:
      "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf",
    startDate: "22 Fab 2024",
    endDate: "22 Jan 2025",
    monthRent: 1200,
  },
  {
    id: "2",
    documentName: "Document 2",
    documentLink:
      "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf",
    startDate: "22 Fab 2024",
    endDate: "22 Jan 2025",
    monthRent: 1200,
  },
  {
    id: "3",
    documentName: "Document 3",
    documentLink:
      "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_PDF.pdf",
    startDate: "22 Fab 2024",
    endDate: "22 Jan 2025",
    monthRent: 1200,
  },
];

export const samplePaymentData = [
  {
    id: "1",
    invoiceNo: "inv2458xyc",
    note: "Rent for April",
    amount: 3200,
    paymentDate: "15 April 2024",
    paymentDueDate: "01 May 2024",
    status: "paid",
    tenant: "Emily Clark",
  },
  {
    id: "2",
    invoiceNo: "inv7893abc",
    note: "Annual Maintenance",
    amount: 1500,
    paymentDate: "05 March 2024",
    paymentDueDate: "10 March 2024",
    status: "open",
    tenant: "Michael Smith",
  },
  {
    id: "3",
    invoiceNo: "inv9630qwe",
    note: "Utility Bill",
    amount: 600,
    paymentDate: "20 March 2024",
    paymentDueDate: "25 March 2024",
    status: "paid",
    tenant: "Sarah Johnson",
  },
  {
    id: "4",
    invoiceNo: "inv8524rty",
    note: "Parking Fee",
    amount: 300,
    paymentDate: "11 March 2024",
    paymentDueDate: "15 March 2024",
    status: "open",
    tenant: "James Williams",
  },
];

export const sampleCommunityData = [
  {
    id: "a6f5",
    name: "Second hand car for sale",
    description: "Top condition ",
    contactNumber: "09879154689",
    email: "jsmith@gmail.com",
    address: "304. park view",
    price: "60000",
    image:
      "https://imgd-ct.aeplcdn.com/640X480/cw/ucp/stockApiImg/QM0B9FY_5632c10a393746479ed4bbbc8f61ea05_1_30554345.jpeg?q=80",
  },
];

export const sampleTenantAnnouncements = [
  {
    id: "d6e3",
    announcementMessage: "New announcements 1",
    announcementdate: "18/02/2024",
    announcementDetails: "announcementDetailsannouncementDetails",
  },
  {
    id: "d6e4",
    announcementMessage: "New announcements 2",
    announcementdate: "06/02/2024",
    announcementDetails: "announcementDetailsannouncementDetails",
  },
  {
    id: "d6e6",
    announcementMessage: "New announcements 3",
    announcementdate: "10/01/2024",
    announcementDetails: "announcementDetailsannouncementDetails",
  },
  {
    id: "d6e7",
    announcementMessage: "New announcements 4",
    announcementdate: "10/01/2024",
    announcementDetails: "announcementDetailsannouncementDetails",
  },
];
