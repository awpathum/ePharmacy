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
@CrossOrigin(origins="http://localhost:4200")
public class SupplierController {

	// need to inject the supplier service
	@Autowired
	private SupplierService supplierService;

	@PostMapping("/")
	public Supplier saveSupplier(@RequestBody Supplier theSupplier) {
		//theSupplier.setId("X");
		supplierService.saveSupplier(theSupplier);
		return theSupplier;
	}

	@GetMapping("/")
	public List<Supplier> listSuppliers() {

		// get suppliers form the service
		List<Supplier> theSuppliers = supplierService.getSuppliers();
		return theSuppliers;
	}

	@PutMapping("/")
	public Supplier updateSupplier(@RequestBody Supplier theSupplier) {

		supplierService.saveSupplier(theSupplier);

		return theSupplier;
	}

	//get supplier by id
	@GetMapping("/{supplierId}")
	public Supplier getSupplier(@PathVariable String supplierId){
		return supplierService.getSupplier(supplierId);
	}

	@DeleteMapping("/{supplierId}")
	@CrossOrigin(origins="http://localhost:4200")
	public String deleteSupplier(@PathVariable String supplierId) {

		Supplier tempSupplier = supplierService.getSupplier(supplierId);

		if(tempSupplier == null) {
			throw new RuntimeException("Supplier id not found - " + supplierId);
		}

		supplierService.deleteSupplier(supplierId);

		return "Deleted Supplier id - " + supplierId;
	}
}
