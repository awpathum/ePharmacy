package com.awpathum.pharmacy.dao;

import java.util.List;

import com.awpathum.pharmacy.entity.Supplier;

public interface SupplierDAO {

	public List<Supplier> getSuppliers();

	public void saveSupplier(Supplier theSupplier);

	public Supplier getSupplier(String theId);

	public void deleteSupplier(String theId);

}