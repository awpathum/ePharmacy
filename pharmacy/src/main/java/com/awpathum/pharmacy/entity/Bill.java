package com.awpathum.pharmacy.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "bill")
public class Bill {

	@Id
	@Column(name = "id")
	private String id;

	@Column(name = "date")
	private String date;

	@Column(name = "total_price")
	private Float totalPrice;
	
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "bill")
	private Set<DrugBill> drugBills;
	

	//private List<Drug> drugs;
	

	public Bill() {

	}

	public Bill(String id, String date, Float totalPrice) {
		super();
		this.id = id;
		this.date = date;
		this.totalPrice = totalPrice;
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		id = id.replace(",", "");
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Float totalPrice) {
		this.totalPrice = totalPrice;
	}
	

//	public List<Drug> getDrugs() {
//		return drugs;
//	}
//
//	public void setDrugs(List<Drug> drugs) {
//		this.drugs = drugs;
//	}

	//add drug to bill
//	public void addDrug(Drug tempDrug) {
//		if(drugs == null) {
//			drugs = new ArrayList<>();
//		}
//		drugs.add(tempDrug);
//	}

	public Set<DrugBill> getDrugBills() {
		return drugBills;
	}

	public void setDrugBills(Set<DrugBill> drugBills) {
		this.drugBills = drugBills;
	}

	@Override
	public String toString() {
		return "Bill [id=" + id + ", date=" + date + ", totalPrice=" + totalPrice + "]";
	}
	
	

}
