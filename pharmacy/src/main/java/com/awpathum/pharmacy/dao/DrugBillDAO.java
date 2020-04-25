package com.awpathum.pharmacy.dao;

import com.awpathum.pharmacy.entity.DrugBill;

import java.util.List;

public interface DrugBillDAO {

	public void saveDrugBill(DrugBill drugBill);

	public List<DrugBill> getDrugsinBill(String billId);
	
}
