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
