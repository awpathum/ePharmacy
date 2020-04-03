package com.awpathum.pharmacy.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.awpathum.pharmacy.entity.Drug;
import com.awpathum.pharmacy.service.DrugService;
import com.awpathum.pharmacy.service.StockService;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class HomeController {
	
	@Autowired
	private StockService stockService;
	
	@Autowired
	private DrugService drugService;
	
	@GetMapping("/checkStock")
	public List<Drug> checkStock() {
		
		List<Drug>drugs = drugService.getDrugs();
		return drugs;
		
	}
	
}
