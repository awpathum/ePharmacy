package com.awpathum.pharmacy.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.awpathum.pharmacy.entity.Drug;

import javax.persistence.EntityManager;

@Repository
public class DrugDAOImpl implements DrugDAO {

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Drug> getDrugs() {

		Session currentSession = entityManager.unwrap(Session.class);

		// create a query
		Query<Drug> theQuery = currentSession.createQuery("from Drug", Drug.class); // Drug is entity
																								// class name
		// execute query and get result list
		List<Drug> drugs = theQuery.getResultList();
		System.out.println("drugs size");
		System.out.println(drugs.size());
		// return the results
		return drugs;
	}

	@Override
	public void saveDrug(Drug theDrug) {

		// get current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// save the customer
		System.out.println("Drug DAO Quantity");
		System.out.println(theDrug.getQuantity());
		currentSession.saveOrUpdate(theDrug);

	}
	
	@Override
	public Drug getDrug(String theId) {
		System.out.println("drugDAO");
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		// retrieve data from database using the primary key
		System.out.println(("theId"));
		System.out.println(theId);
		Drug theDrug = currentSession.get(Drug.class, theId);

		return theDrug;
	}

	@Override
	public void deleteDrug(String theId) {
		
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		// delete the object with primary key
		Query theQuery = currentSession.createQuery("delete from Drug where id=:drugId");

		theQuery.setParameter("drugId", theId);

		theQuery.executeUpdate();
		
	}

}
