package com.awpathum.pharmacy.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.awpathum.pharmacy.entity.Drug;
import com.awpathum.pharmacy.entity.Stock;
import com.awpathum.pharmacy.entity.Supplier;
import com.awpathum.pharmacy.service.DrugService;
import com.awpathum.pharmacy.service.StockService;
import com.awpathum.pharmacy.service.SupplierService;

@RestController
@RequestMapping("/stock")
public class StockController {
	

	// need to inject the stock service
	@Autowired
	private StockService stockService;
	
	@Autowired
	private SupplierService supplierService;
	
	@Autowired
	private DrugService drugService;

	@PostMapping("/save")
	public Stock addStock(@RequestBody Stock theStock) {

		theStock.setId("X");

		stockService.saveStock(theStock);

		return theStock;
	}

	@GetMapping("/list")
	public List<Stock> listStocks() {

		// get stocks form the service
		List<Stock> theStocks = stockService.getStocks();
		return theStocks;
	}

	@PutMapping("/stock")
	public Stock updateStock(@RequestBody Stock theStock) {

		stockService.saveStock(theStock);

		return theStock;
	}

	@GetMapping("/delete/{theId}")
	public String delete(@PathVariable String theId) {
		
		//reduce drug quantity from general stock
		Drug theDrugFromStock = stockService.getStock(theId).getDrug();
		Integer toDeleteQuantity = stockService.getStock(theId).getQuantity();
		String toDeleteDrugId = theDrugFromStock.getId();
		
		
		Drug genDrug = drugService.getDrug(toDeleteDrugId);
		Integer remQuantity = genDrug.getQuantity() - toDeleteQuantity;
		
		genDrug.setQuantity(remQuantity);
		
		drugService.saveDrug(genDrug);
		
		// delete the stock
		stockService.deleteStock(theId);

		return "Deleted" + theId;

	}
	
	@PostMapping("/saveSupplier")
	public String saveSupplier(@RequestBody String supplierId,@RequestBody String stockId) {
		
		
		Supplier supplier = supplierService.getSupplier(supplierId);
		
		
		Stock stock = stockService.getStock(stockId);
		
		supplier.add(stock);
		stock.setSupplier(supplier);
		supplierService.saveSupplier(supplier);
		stockService.saveStock(stock);
		//System.out.println("Done!");
		return "Done";
	}

	
	@PostMapping("/saveDrug")
	public String saveDrug(@RequestBody String drugId,@RequestBody String stockId) {
		
		Drug drug = drugService.getDrug(drugId);
		
		
		Stock stock = stockService.getStock(stockId);
		
		drug.add(stock);
		stock.setDrug(drug);
		drugService.saveDrug(drug);
		stockService.saveStock(stock);
		
		//
		
		//String drugId = theStock.getId().substring(0,5);
		//System.out.println(drugId);
		Drug theDrug = drugService.getDrug(drugId);
		Integer curQuantity = theDrug.getQuantity();
		
		Integer newQuantity = stock.getQuantity();
		Integer updatedQuantity = curQuantity + newQuantity;
		

		theDrug.setQuantity(updatedQuantity);
		
		drugService.saveDrug(theDrug);
		//
		//System.out.println("Done!");
		return "Done";
	}
	
}
