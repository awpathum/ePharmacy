package com.awpathum.pharmacy.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.awpathum.pharmacy.entity.Supplier;
import com.awpathum.pharmacy.service.SupplierService;

@RestController
@RequestMapping("/supplier")
public class SupplierController {

	// need to inject the supplier service
	@Autowired
	private SupplierService supplierService;

	@PostMapping("/save")
	public Supplier saveSupplier(@RequestBody Supplier theSupplier) {
		theSupplier.setId("");
		supplierService.saveSupplier(theSupplier);
		return theSupplier;
	}

	@GetMapping("/list")
	public List<Supplier> listSuppliers(Model theModel) {

		// get suppliers form the service
		List<Supplier> theSuppliers = supplierService.getSuppliers();
		return theSuppliers;
	}

	@PutMapping("/update")
	public Supplier updateSupplier(@RequestBody Supplier theSupplier) {

		supplierService.saveSupplier(theSupplier);

		return theSupplier;
	}
	
	@GetMapping("/delete")
	public String delete(@RequestParam("supplierId") String theId) {

		// delete the drug
		supplierService.deleteSupplier(theId);

		return "redirect:/supplier/list";

	}

	@DeleteMapping("/delete/{supplierId}")
	public String deleteSupplier(@PathVariable String supplierId) {

		Supplier tempSupplier = supplierService.getSupplier(supplierId);

		if(tempSupplier == null) {
			throw new RuntimeException("Supplier id not found - " + supplierId);
		}

		supplierService.deleteSupplier(supplierId);

		return "Deleted Supplier id - " + supplierId;
	}
}
