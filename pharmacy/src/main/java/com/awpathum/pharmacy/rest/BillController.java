package com.awpathum.pharmacy.rest;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


import com.awpathum.pharmacy.classes.BillDrugQuantity;
import com.awpathum.pharmacy.entity.Bill;
import com.awpathum.pharmacy.entity.Drug;
import com.awpathum.pharmacy.entity.DrugBill;
import com.awpathum.pharmacy.entity.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.awpathum.pharmacy.service.BillService;
import com.awpathum.pharmacy.service.DrugBillService;
import com.awpathum.pharmacy.service.DrugService;
import com.awpathum.pharmacy.service.StockService;

@RestController
@RequestMapping("/bill")
public class BillController {

	// need to inject the bill service
	@Autowired
	private BillService billService;
	
	@Autowired
	private DrugService drugService;
	
	@Autowired
	private DrugBillService drugBillService;
	
	@Autowired
	private StockService stockService;

//	@GetMapping("/add")
//	public void addBill(Model theModel) {
//
//		Bill theBill = new Bill();
//
//		theModel.addAttribute("bill", theBill);
//	}

	@GetMapping("/hello")
	public String hello() {

		// get bills form the service
		return "Hello";
	}

	@PostMapping("/")
	public Bill saveBill(@RequestBody Bill theBill) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");  
		Date date = new Date();
		String dateF = formatter.format(date);
		
		
		//theBill.setId(billId);
		theBill.setDate(dateF);
		
		billService.saveBill(theBill);
		System.out.println("Saved!!");
		return theBill;

	}

	@GetMapping("/")
	public List<Bill> listBills() {

		// get bills form the service
		return billService.getBills();
	}


	@PostMapping("/addDrugs")
	public void saveDrugsForBill(@RequestBody BillDrugQuantity billDrugQuantity) {

		String billId = billDrugQuantity.getBillId();
		String drugId = billDrugQuantity.getDrugId();
		Integer quantity = billDrugQuantity.getQuantity();
		
		
		Bill bill = billService.getBill(billId);
		
		Drug drug = drugService.getDrug(drugId);


		
		Float unitPrice = Float.parseFloat(drug.getUnitPrice());
		
		Float totalPrice = unitPrice * quantity;
		
		bill.setTotalPrice(totalPrice);
		
		
		
		DrugBill db = new DrugBill();
		
		db.setBill(bill);
		db.setDrug(drug);
		db.setQuantity(quantity);
		db.setTotalPrice(totalPrice);
		
		
		
		bill.getDrugBills().add(db);
		drug.getDrugBills().add(db);
		
		//reduce drug stock
		Integer drugQuantity = drug.getQuantity();
		
		if(drugQuantity >= quantity) {
			Integer newQuantity = (int) (drugQuantity - quantity);
			drug.setQuantity(newQuantity);
		
			
			//reduce drug from stock
			
			//get List of stocks and sort on ID. oldest id 1st
			List<Stock> stocks = stockService.getSpecifcStocks(drugId);
			
			
			Integer remStock = 0;
			Integer reqStock = 0;
			Integer currentStock = 0;
			String updatedStockId = null;
			
			int i = 0;
			while(reqStock != quantity) {
				currentStock = currentStock + stocks.get(i).getQuantity();
				
				if( currentStock >= quantity) {
					remStock = currentStock - quantity;
					reqStock = quantity;
					updatedStockId = stocks.get(i).getId();
				}else {
					stocks.get(i).setQuantity(0);
					reqStock = reqStock + currentStock;
				}
				i++;
			}
			
			System.out.println(i);
			
			
			for(int j = 0;j <i;j++) {
				Stock theStock = stocks.get(j);
				stockService.reduceStock(theStock.getId(), 0);
			}
			stockService.reduceStock(updatedStockId, remStock);
			billService.saveBill(bill);
			drugBillService.saveDrugBill(db);
			drugService.saveDrug(drug);
		System.out.println("Done!");
		
	}

}
}