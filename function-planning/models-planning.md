##Models required: User and deeds are independent. Comments and offers are imbedded within deeds.

```
user model:
{
  firstName:  
  lastName:   
  username:
  email:    
  image:
  blurb:
  password:
  passwordHash:
  userId:
  reference to deed model

}
```

```
deed model:
{
  deedName:
  location:
  reference user model: get username, image, blurb, userId
  *can the embedded models reference each other?*
  offerModel: [{
    *how is this different to messages?*
    }],
  messagesModel: [{
    
    }]

}
```
