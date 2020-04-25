package com.awpathum.pharmacy.service;
import com.awpathum.pharmacy.entity.Bill;
import com.awpathum.pharmacy.entity.DrugBill;

import java.util.List;


public interface DrugBillService {
	
	public void saveDrugBill(DrugBill drugBill);

	public List<DrugBill> getDrugsinBill(String billId);

}
