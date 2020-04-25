package com.awpathum.pharmacy.dao;

import com.awpathum.pharmacy.entity.Drug;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.awpathum.pharmacy.entity.DrugBill;

import javax.persistence.EntityManager;
import java.util.List;

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

	@Override
	public List<DrugBill> getDrugsinBill(String billId) {
		System.out.println("in new method DAO");
		Session currentSession  = entityManager.unwrap((Session.class));

	Query<DrugBill> theQuery = currentSession.createQuery("from DrugBill WHERE bill_id = :billId");
	theQuery.setParameter("billId", billId);
		List<DrugBill> drugBills = theQuery.getResultList();

		return drugBills;
	}

}
