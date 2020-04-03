package com.awpathum.pharmacy.service;

import java.util.List;

import com.awpathum.pharmacy.entity.Supplier;

public interface SupplierService {

	public List<Supplier> getSuppliers();

	public void saveSupplier(Supplier theSupplier);

	public Supplier getSupplier(String supId);

	public void deleteSupplier(String theId);


}
