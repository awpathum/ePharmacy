package com.awpathum.pharmacy.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.awpathum.pharmacy.entity.Supplier;

import javax.persistence.EntityManager;

@Repository
public class SupplierDAOImpl implements SupplierDAO {

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Supplier> getSuppliers() {

		Session currentSession = entityManager.unwrap(Session.class);

		// create a query
		Query<Supplier> theQuery = currentSession.createQuery("from Supplier", Supplier.class); // Supplier is entity
																								// class name
		// execute query and get result list
		List<Supplier> suppliers = theQuery.getResultList();
		System.out.println("suppliers size");
		System.out.println(suppliers.size());
		// return the results
		return suppliers;
	}

	@Override
	public void saveSupplier(Supplier theSupplier) {

		// get current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// save the customer
		currentSession.saveOrUpdate(theSupplier);

	}
	
	@Override
	public Supplier getSupplier(String theId) {
		System.out.println("supplierDAO");
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		// retrieve data from database using the primary key
		Supplier theSupplier = currentSession.get(Supplier.class, theId);

		return theSupplier;
	}

	@Override
	public void deleteSupplier(String theId) {
		
		// get the current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);
		// delete the object with primary key
		Query theQuery = currentSession.createQuery("delete from Supplier where id=:supplierId");

		theQuery.setParameter("supplierId", theId);

		theQuery.executeUpdate();
		
	}

}
