### Sql queries for data retrievals


### Getting friends of particular user:

select u.id,u.firstname,u.lastname,u.email from users u,ufriends uf where (uf.fid=u.id and uf.userid=1);
//In this example we can get friends of user with id 1

### getting expenses created by user 
select e.id,e.description,e.amount from users u,expenses e where (u.id=e.createdby);

### expense id mapping from expense table and expensemembers table



