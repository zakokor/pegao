<div align="center">

  [![Pegao](./dione/static/img/big.pegao.svg)](https://pegao.co)
  ### Pegao is a space to save and share curated pages with others.

</div>

I'm developing Pegao with Django, ReactJS and Bulma, trying to keep it simple, and hosted on Digital Ocean.

[Pegao.co](https://pegao.co) already works, but it is still in beta. So far I have built:
- Post links.
- Lists of links.
- Followers.
- Emoji filter.

And the roapmap at a high level includes: 
- Likes.
- Account page features.
- Bookmark search.
- Private bookmarks / private profiles.
- Follow sources.
- Share links in social networks, mail.
- Page with most popular and most recent links.
- Customize interests.
- Spanish language support.
- Order links and mark them as done.
- Email notifications (possibly with Celery + Redis + Email service)

...and the list keeps growing, but we will need your help to get there.

## How did I start Pegao?
I started the project a few months ago when I was looking for a bookmark where to organize all the links that remained open for a long time on my phone, easily save the new links I was finding and that I would need temporarily the next day; and also it had to be able to share some of those links with my wife without them ending up without being read...I know! There were many options but I did not feel that they were made to fulfill this purpose...and that's how I achieved my initial goal so far.

## Why Pegao?
It comes from the spanish word "pegado" and means "to be fashionable" (like the  song of the 90s), but it also refers to the crusted rice of the bottom of a cooking pot (delicious if it is not burned), and possibly in each country in Latin America has its own meaning because Pegao is something popular that belongs to people.

I translated it into English as "Paste", but if someone has a better idea ... it would be very helpful. 


## How to use...

Pasting a link is very simple, write in the address bar of the browser "pegao.co" before the link you want to share and press "Paste".

<div align="center">
  <img height="50px" src="/dione/static/img/howtopost.gif" alt="how to use..." />
</div>

<br />
You can create your own lists —written with a / symbol— with your links to easily categorize them. 

## Development

### Prerequisites

 - [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
 - [Google OAuth 2.0 Client ID](https://console.developers.google.com/apis/credentials)


### Install dependencies

```
  npm install
  pip install -r requirements.txt
```

### Install database

After installing PostgreSQL (if you don't already have it installed), update database config in `voyager\registry.py` with your values, eg.
```
REG_SECRET_KEY="<randomly generated secret key>"
REG_DEBUG="True"
REG_ALLOWED_HOSTS=["127.0.0.1"]
REG_DATABASE_NAME="postgres"
REG_DATABASE_USER="postgres"
REG_DATABASE_PW="123"
REG_DATABASE_HOST="localhost"
BUGSNAG_API_KEY=""
```

#### Migrate database

```
  python manage.py makemigrations hiperion
  python manage.py migrate
```

### Set up Google OAuth

This app uses sign-in with Google so you need to create your won [Google OAuth Client Credetials](https://developers.google.com/identity/protocols/oauth2/web-server). After creating your client update the following keys in `voyager\settings.py`:
```
  SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '<Your Client ID>'
  SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = '<Your Client Secret>'
```

### Start the application

Build the front-end
```
  npm run watch
```

Run the back-end
```
  python manage.py runserver
```
The app should be running on `http://127.0.0.1:8000/`.


## Copyright

[GNU Affero License](LICENSE) © 2019 [Gonzalo Aragón](https://github.com/zakokor).
