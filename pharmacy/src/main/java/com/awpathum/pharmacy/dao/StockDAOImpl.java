package com.awpathum.pharmacy.dao;

import java.util.List;

import com.awpathum.pharmacy.classes.StockResponse;
import org.hibernate.Session;
import javax.persistence.EntityManager;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.awpathum.pharmacy.entity.Stock;

@Repository
public class StockDAOImpl implements StockDAO {

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<StockResponse> getStocks() {

		Session currentSession = entityManager.unwrap(Session.class);

		String sqlQuery="SELECT new com.awpathum.pharmacy.classes.StockResponse(s.id,s.drugName,s.quantity,s.manDate,s.resDate,s.expDate,sp.name,sp.id) FROM Stock s INNER JOIN s.supplier sp";

		Query<StockResponse> theQuery = currentSession.createQuery(sqlQuery);
		// execute query and get result list
		List<StockResponse> stocks = theQuery.getResultList();

		// return the results
		return stocks;
	}

	@Override
	public void saveStock(Stock theStock) {

		// get current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// save the customer
		currentSession.saveOrUpdate(theStock);

	}
	
	@Override
	public Stock getStock(String theId) {
		System.out.println("stockDAO");
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		// retrieve data from database using the primary key
		Stock theStock = currentSession.get(Stock.class, theId);

		return theStock;
	}

	@Override
	public void deleteStock(String theId) {
		
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		// delete the object with primary key
		Query theQuery = currentSession.createQuery("delete from Stock where id=:stockId");

		theQuery.setParameter("stockId", theId);

		theQuery.executeUpdate();
		
	}

	@Override
	public void reduceStock(String theId,Integer quantity) {
		
		Session currentSession = entityManager.unwrap(Session.class);
		
		
		
		Query theQuery = currentSession.createQuery("update Stock set quantity = :quantity where id=:stockId");
		
		theQuery.setParameter("stockId", theId);
		theQuery.setParameter("quantity", quantity);

		theQuery.executeUpdate();
		
		System.out.println(theId);
		System.out.println("Stock update done");
	}

	@Override
	public List<Stock> getSpecifcStocks(String drugId) {
		
		Session currentSession = entityManager.unwrap(Session.class);

		// create a query
		Query<Stock> theQuery = currentSession.createQuery("from Stock where drug_id = :drugId order by id" , Stock.class); // Supplier is entity
																								// class name
		theQuery.setParameter("drugId", drugId);
		// execute query and get result list
		List<Stock> stocks = theQuery.getResultList();
		// return the results
		return stocks;
	}

}
