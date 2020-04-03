package com.awpathum.pharmacy.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.awpathum.pharmacy.entity.DrugBill;
import com.awpathum.pharmacy.entity.DrugBill;

import javax.persistence.EntityManager;

@Repository
public class DrugBillDAOImpl implements DrugBillDAO {

	
	@Autowired
	private EntityManager entityManager;

	@Override
	public void saveDrugBill(DrugBill drugBill) {
		// get current hibernate session
		Session currentSession = entityManager.unwrap(Session.class);

		// save the customer
		currentSession.saveOrUpdate(drugBill);

	}

}
