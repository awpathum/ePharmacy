package com.awpathum.pharmacy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.awpathum.pharmacy.dao.BillDAO;
import com.awpathum.pharmacy.entity.Bill;

@Service
@Transactional
public class BillServiceImpl implements BillService {

	@Autowired
	private BillDAO billDAO;

	@Override
	public List<Bill> getBills(String username) {
		
		System.out.println("Bill Service");

		return billDAO.getBills(username);
	}

	
	@Override
	@Transactional
	public void saveBill(Bill theBill) {
		billDAO.saveBill(theBill);

	}

	@Override
	@Transactional
	public Bill getBill(String supId) {
		return billDAO.getBill(supId);
		
	}


	@Override
	@Transactional
	public void deleteBill(String theId) {
		
		billDAO.deleteBill(theId);
	}

}
