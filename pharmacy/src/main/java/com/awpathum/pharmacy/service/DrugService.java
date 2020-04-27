package com.awpathum.pharmacy.service;

import java.util.List;

import com.awpathum.pharmacy.entity.Drug;

public interface DrugService {

	public List<Drug> getDrugs(String username);

	public void saveDrug(Drug theDrug);

	public Drug getDrug(String supId);

	public void deleteDrug(String theId);


}
