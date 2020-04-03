package com.awpathum.pharmacy.dao;

import java.util.List;

import com.awpathum.pharmacy.entity.Drug;

public interface DrugDAO {

	public List<Drug> getDrugs();

	public void saveDrug(Drug theDrug);

	public Drug getDrug(String theId);

	public void deleteDrug(String theId);

}