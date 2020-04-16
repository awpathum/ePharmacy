package com.awpathum.pharmacy.service;

import java.util.List;

import com.awpathum.pharmacy.classes.StockResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.awpathum.pharmacy.dao.StockDAO;
import com.awpathum.pharmacy.entity.Stock;

@Service
@Transactional
public class StockServiceImpl implements StockService {
	
	@Autowired
	private StockDAO stockDAO;

//	@Override
//	public List<Stock> getStocks() {
//
//		return stockDAO.getStocks();
//	}

	@Override
	public List<StockResponse> getStocks() {

		return stockDAO.getStocks();
	}

	@Override
	@Transactional
	public void saveStock(Stock theStock) {
		
		 stockDAO.saveStock(theStock);

	}

	@Override
	@Transactional
	public Stock getStock(String theId) {

		return stockDAO.getStock(theId);
	}

	@Override
	@Transactional
	public StockResponse getStockResponse(String theId) {
		
		return stockDAO.getStockResponse(theId);
	}

	@Override
	@Transactional
	public void deleteStock(String theId) {
		
		stockDAO.deleteStock(theId);
		
	}
	
	@Override
	@Transactional
	public void reduceStock(String theId,Integer quantity) {
		stockDAO.reduceStock(theId,quantity);
	}

	@Override
	public List<Stock> getSpecifcStocks(String drugId) {
		
		return stockDAO.getSpecifcStocks(drugId);
	}

}
