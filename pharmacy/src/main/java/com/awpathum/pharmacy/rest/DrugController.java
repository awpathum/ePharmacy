package com.awpathum.pharmacy.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.awpathum.pharmacy.entity.Drug;
import com.awpathum.pharmacy.service.DrugService;

@RestController
@RequestMapping("/drug")
public class DrugController {

	// need to inject the drug service
	@Autowired
	private DrugService drugService;


	@PostMapping("/save")
	public Drug saveDrug(@RequestBody Drug theDrug) {

		theDrug.setQuantity(0);
		drugService.saveDrug(theDrug);
		System.out.println("Saved!!");
		return theDrug;

	}

	@GetMapping("/list")
	public List<Drug> listDrugs(Model theModel) {

		// get drugs form the service
		List<Drug> theDrugs = drugService.getDrugs();
		return theDrugs;
	}

	@PutMapping("/update")
	public Drug updateDrug(@RequestBody Drug theDrug) {

		drugService.saveDrug(theDrug);

		return theDrug;
	}

	@DeleteMapping("/drugs/{drugId}")
	public String deleteDrug(@PathVariable String drugId) {

		Drug tempDrug = drugService.getDrug(drugId);

		if(tempDrug == null) {
			throw new RuntimeException("Drug id not found - " + drugId);
		}

		drugService.deleteDrug(drugId);

		return "Deleted drug id - " + drugId;
	}
}
