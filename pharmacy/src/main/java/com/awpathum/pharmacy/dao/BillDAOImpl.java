package com.awpathum.pharmacy.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.awpathum.pharmacy.entity.Bill;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Repository
public class BillDAOImpl implements BillDAO {

	@Autowired
	private EntityManager entityManager;

	@Override
	@Transactional
	public List<Bill> getBills(String username) {
		
		Session currentSession = entityManager.unwrap(Session.class);

		// create a query
		Query<Bill> theQuery = currentSession.createQuery("from Bill Where id like :username", Bill.class); // Bill is entity
																								// class name
		theQuery.setParameter("username", username+"%");
		// execute query and get result list
		List<Bill> bills = theQuery.getResultList();
		System.out.println(bills);
		// return the results
		return bills;
	}

	@Override
	public void saveBill(Bill theBill) {

		// get current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// save the customer
		currentSession.saveOrUpdate(theBill);

	}
	
	@Override
	public Bill getBill(String theId) {
		System.out.println("billDAO");
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		// retrieve data from database using the primary key
		Bill theBill = currentSession.get(Bill.class, theId);

		return theBill;
	}

	@Override
	public void deleteBill(String theId) {
		
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		// delete the object with primary key
		Query theQuery = currentSession.createQuery("delete from Bill where id=:billId");

		theQuery.setParameter("billId", theId);

		theQuery.executeUpdate();
		
	}

}
