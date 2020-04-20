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
@CrossOrigin(origins="http://localhost:3000")
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

	//get bill by id
	@GetMapping("/{billId}")
	public Bill getBill(@PathVariable String billId){
		return billService.getBill(billId);

	}

	@PostMapping("/addDrugs")
	public void saveDrugsForBill(@RequestBody List<BillDrugQuantity> billDrugQuantity) {

	    Float totalPrice = Float.valueOf(0);
	    Bill bill = new Bill();
        DrugBill db = new DrugBill();
		for (int k =0 ; k < billDrugQuantity.size(); k++){

			System.out.println(k);
			System.out.println("size");
			System.out.println(billDrugQuantity.size());
			System.out.println(billDrugQuantity.get(k).getDrugId());
			System.out.println("#1");
			String billId = billDrugQuantity.get(k).getBillId();
			System.out.println("#2");
			String drugId = billDrugQuantity.get(k).getDrugId();
			System.out.println("#3");
			Integer quantity = billDrugQuantity.get(k).getQuantity();
			System.out.println("#4");
			//Float netPrice = billDrugQuantity.get(k).getNetPrice();

			bill = billService.getBill(billId);
			System.out.println("#5");
			System.out.println(drugId);
			Drug drug = drugService.getDrug(drugId);
			System.out.println("#6");


			Float unitPrice = Float.parseFloat(drug.getUnitPrice());

			Float netPrice = unitPrice * quantity;

		//	bill.setTotalPrice(totalPrice);
			System.out.println("totalPrice");
          //  System.out.println(totalPrice);





			db.setBill(bill);
			db.setDrug(drug);
			db.setQuantity(quantity);




			bill.getDrugBills().add(db);
			drug.getDrugBills().add(db);

			//reduce drug stock
			Integer drugQuantity = drug.getQuantity();
			System.out.println("*-*-*-*-*-*-*-*-**-*-*");
			if(drugQuantity >= quantity) {
				Integer newQuantity = (int) (drugQuantity - quantity);
				drug.setQuantity(newQuantity);


				//reduce drug from stock

				//get List of stocks and sort on ID. oldest id 1st
				List<Stock> stocks = stockService.getSpecifcStocks(drugId);
				System.out.println("stockslen");
				System.out.println(stocks.size());


				Integer remStock = 0;
				Integer reqStock = 0;
				Integer currentStock = 0;
				String updatedStockId = null;

				int i = 0;
				while(reqStock != quantity) {

					System.out.println("While loop");
					System.out.println(quantity);
					System.out.println(reqStock);
					if (stocks.size() > i) {
					currentStock = currentStock + stocks.get(i).getQuantity();
					System.out.println("#8");
					if (currentStock >= quantity) {
						remStock = currentStock - quantity;
						reqStock = quantity;
						updatedStockId = stocks.get(i).getId();
						System.out.println("#9");
					} else {
						System.out.println("#10");
						stocks.get(i).setQuantity(0);
						reqStock = reqStock + currentStock;
					}

					System.out.println("#11");
				}else{
						break;
					}
					i++;
				}
				System.out.println("#12");
				//System.out.println(i);


				for(int j = 0;j <i;j++) {
					Stock theStock = stocks.get(j);
					stockService.reduceStock(theStock.getId(), 0);
				}
				stockService.reduceStock(updatedStockId, remStock);
//				billService.saveBill(bill);
//				drugBillService.saveDrugBill(db);
//				drugService.saveDrug(drug);
				System.out.println("Done!");



		}
            bill.setTotalPrice(totalPrice);
			totalPrice += netPrice;
			db.setTotalPrice(totalPrice);
			bill.setTotalPrice(totalPrice);
			billService.saveBill(bill);
			drugBillService.saveDrugBill(db);
			drugService.saveDrug(drug);
			System.out.println("totalPrice");
			System.out.println((totalPrice));
			System.out.println("While loop end");

	}

		System.out.println("Done!!");

}

}