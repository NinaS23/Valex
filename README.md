# valex
<div align="center">
	<img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/pizza_1f355.png">
</div>

## About the project 
- Backend Project
- database: postgresSQL
- card services 
## Routes
<div>
<h3> cardRouter </h3>
<ul>
	<li>POST : "/create-card" => x-api-key (header), employeeId (body), type (body);</li> 
	<li>POST : "/activate-card" =>  cardId (body), password (body), CVC (body);
	<li>GET : "/view-transections/:id" => id (params);</li>
	<li>POST : "/block-card" => cardId (body), password (body);</li>
	<li>POST : "/block-card" => cardId (body), password (body);</li>
	<li>POST : "/unlock-card" => cardId (body), password (body);</li>
</ul>
<h3>rechargeRouter</h3>
<ul>
	<li>POST : "/recharge-card/:id" => id (params), x-api-key (header), amount (body);</li>
</ul>
<h3>shoppingRouter</h3>
<ul>
 	<li>POST : "/shopping/:id" => id (params), password (body), amount (body), bussinesId (body);</li>
</ul>
</div>

## build with 
<div align="center">
	<img src="https://camo.githubusercontent.com/6cf9abe9d706421df40ff4feff208a5728df2b77f9eb21f24d09df00a0d69203/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3030374143433f7374796c653d666f722d7468652d6261646765266c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465" >
	<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" >
	<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" >
  	<img src="https://camo.githubusercontent.com/dfc69d704694f22168bea3d84584663777fa5301dcad5bbcb5459b336da8d554/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533443f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465"/>
	<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" >
</div>
