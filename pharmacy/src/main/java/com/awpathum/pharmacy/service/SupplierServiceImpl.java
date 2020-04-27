package com.awpathum.pharmacy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.awpathum.pharmacy.dao.SupplierDAO;
import com.awpathum.pharmacy.entity.Supplier;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

	@Autowired
	private SupplierDAO supplierDAO;

	@Override
	public List<Supplier> getSuppliers(String username) {

		return supplierDAO.getSuppliers(username);
	}

	
	@Override
	@Transactional
	public void saveSupplier(Supplier theSupplier) {
		supplierDAO.saveSupplier(theSupplier);

	}

	@Override
	@Transactional
	public Supplier getSupplier(String supId) {
		System.out.println("suppier service");
		return supplierDAO.getSupplier(supId);
		
	}


	@Override
	@Transactional
	public void deleteSupplier(String theId) {
		
		supplierDAO.deleteSupplier(theId);
	}

}
