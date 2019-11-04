# Altran Shopping Cart Frontend - Test by Danilo Buzar

## Clonning de application

- Run `git clone https://github.com/danilobuzar/altran-shopping-cart-frontend.git`

## How to run the app locally?

- Run `npm install` to install required dependencies.
- Run `ng serve --open` to run the angular app

## Running with Docker

- Run `docker build -t dbuzar/altran-shopping-cart-frontend .` to build de app
- Run `docker run -d -v ${PWD}:/app-frontend -v /app-frontend/node_modules -p 4200:4200 --rm dbuzar/altran-shopping-cart-frontend` to run the application

**Open the browser and point to `http://localhost:4200`**

# Frontend workflow

## When openning the APP for the first time, you'll be redirected to add a new user

![Add User](/docs/images/add-user.png)

## Then you'll be redirected to the users list (where you can also manage them)

![Users list](/docs/images/users-list-1.png)

## If none user exists, then you'll se an empty list

![Users list](/docs/images/users-list-2.png)

## Add a new product clicking in the menu options list "Products List" 

![Add product](/docs/images/add-product-2.png)

![Products list](/docs/images/products-list-1.png)

![Products list](/docs/images/products-list-2.png)

## Once you haven't selected an user in the top right dropdown, the button "Add to cart" won't be available. Please selecte one.

![Products list](/docs/images/products-list-3.png)

## Click in the button "Add to cart" to add a new item to the cart

![Shopping cart](/docs/images/shopping-cart-list.png)
