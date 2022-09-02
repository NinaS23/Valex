# valex
<div align="center">
	<img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/pizza_1f355.png">
</div>

## About the project 
- Backend Project
- database: postgresSQL
- card services 

## Routes

cardRoute
- POST : "/create-card" => x-api-key (header), employeeId (body), type (body);
- POST : "/activate-card" =>  cardId (body), password (body), CVC (body);
- GET : "/view-transections/:id" => id (params);
- POST : "/block-card" => cardId (body), password (body);
- POST : "/block-card" => cardId (body), password (body);
- POST : "/unlock-card" => cardId (body), password (body);
rechargeRoute
 - POST : "/recharge-card/:id" => id (params), x-api-key (header), amount (body);
shoppingRoute
- POST : "/shopping/:id" => id (params), password (body), amount (body), bussinesId (body);
