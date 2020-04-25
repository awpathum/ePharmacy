package com.awpathum.pharmacy.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "drug")
public class Drug {
	
	@Id
	@Column(name = "id")
	private String id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "unit_price")
	private String unitPrice;
	
	@Column(name = "compound")
	private String compound;
	
	@Column(name = "quantity")
	private Integer quantity;

	@Column(name = "warning_level")
	private Integer warningLevel;

	
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "drug",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH,CascadeType.REFRESH})
	private List<Stock> stocks;
	
	 @OneToMany(fetch = FetchType.EAGER,mappedBy = "bill")
	 private Set<DrugBill> drugBills = new HashSet<DrugBill>();
	//private List<DrugBill> drugBills;
	
	
	public Drug() {
		
	}
	
	public Drug(String id,String name,String unitPrice,String compound,Integer warningLevel) {
		
		this.id = id;
		this.name = name;
		this.unitPrice = unitPrice;
		this.compound = compound;
		this.warningLevel = warningLevel;
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		id = id.replace(",", "");
		this.id = id;
	}

	public Integer getWarningLevel() {
		return warningLevel;
	}

	public void setWarningLevel(Integer warningLevel) {
		this.warningLevel = warningLevel;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(String unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getCompound() {
		return compound;
	}

	public void setCompound(String compound) {
		this.compound = compound;
	}

	public List<Stock> getStocks() {
		return stocks;
	}

	public void setStocks(List<Stock> stocks) {
		this.stocks = stocks;
	}
	

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}	
	public Set<DrugBill> getDrugBills() {
		return drugBills;
	}

	public void setDrugBills(Set<DrugBill> drugBills) {
		this.drugBills = drugBills;
	}

	//add convenience method for bi-directional relationship
	public void add(Stock tempStock) {
		if(stocks == null) {
			stocks = new ArrayList<>();
		}
		stocks.add(tempStock);
		tempStock.setDrug(this);
	}

	@Override
	public String toString() {
		return "Drug [id=" + id + ", name=" + name + ", unitPrice=" + unitPrice + ", compound=" + compound + "]";
	}
	
	
	
}
