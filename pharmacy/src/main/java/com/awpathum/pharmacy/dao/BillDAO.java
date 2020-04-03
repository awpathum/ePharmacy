package com.awpathum.pharmacy.dao;

import java.util.List;

import com.awpathum.pharmacy.entity.Bill;

public interface BillDAO {

	public List<Bill> getBills();

	public void saveBill(Bill theBill);

	public Bill getBill(String theId);

	public void deleteBill(String theId);

}