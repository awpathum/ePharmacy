package com.awpathum.pharmacy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.awpathum.pharmacy.dao.DrugBillDAO;
import com.awpathum.pharmacy.entity.DrugBill;

@Service
@Transactional
public class DrugBillServiceImpl implements DrugBillService {
	
	// injecting DAO
	@Autowired
	private DrugBillDAO drugBillDAO;

	@Override
	public void saveDrugBill(DrugBill drugBill) {
		drugBillDAO.saveDrugBill(drugBill);
		

	}

}
