package com.awpathum.pharmacy.rest;

import com.awpathum.pharmacy.entity.DrugBill;
import com.awpathum.pharmacy.service.DrugBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/billDrugs")
@CrossOrigin(origins="http://localhost:3000")
public class DrugBillController {

	@Autowired
    private DrugBillService drugBillService;

    @GetMapping("/{billId}")
	public List<DrugBill> getDruginBill(@PathVariable String billId){
		System.out.println("in new method rest");
		return drugBillService.getDrugsinBill(billId);
	}
}
