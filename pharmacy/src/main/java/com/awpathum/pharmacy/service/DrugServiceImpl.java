package com.awpathum.pharmacy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.awpathum.pharmacy.dao.DrugDAO;
import com.awpathum.pharmacy.entity.Drug;

@Service
@Transactional
public class DrugServiceImpl implements DrugService {

	@Autowired
	private DrugDAO drugDAO;

	@Override
	public List<Drug> getDrugs() {

		return drugDAO.getDrugs();
	}

	
	@Override
	@Transactional
	public void saveDrug(Drug theDrug) {
		drugDAO.saveDrug(theDrug);

	}

	@Override
	@Transactional
	public Drug getDrug(String supId) {
		return drugDAO.getDrug(supId);
		
	}


	@Override
	@Transactional
	public void deleteDrug(String theId) {
		
		drugDAO.deleteDrug(theId);
	}

}
