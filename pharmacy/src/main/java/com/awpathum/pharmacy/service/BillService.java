package com.awpathum.pharmacy.service;

import java.util.List;

import com.awpathum.pharmacy.entity.Bill;

public interface BillService {

	public List<Bill> getBills(String username);

	public void saveBill(Bill theBill);

	public Bill getBill(String supId);

	public void deleteBill(String theId);


}
