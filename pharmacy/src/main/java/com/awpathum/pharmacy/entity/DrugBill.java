package com.awpathum.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.List;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "drug_bill")
public class DrugBill {

	
	 @EmbeddedId
	    private DrugBillId id = new DrugBillId();
	 
	    @ManyToOne
	    @MapsId("drugId")
		@JsonIgnore
		private Drug drug;
	 
	    @ManyToOne
	    @MapsId("billId")
		@JsonIgnore
		private Bill bill;
	    
	    @Column(name = "quantity")
	    private Integer quantity;
	    
	    @Column(name = "total_price")
	    private float totalPrice;

		public DrugBillId getId() {
			return id;
		}

		public void setId(DrugBillId id) {
			this.id = id;
		}

		public Drug getDrug() {
			return drug;
		}

		public void setDrug(Drug drug) {
			this.drug = drug;
		}

		public float getTotalPrice() {
			return totalPrice;
		}

		public void setTotalPrice(float totalPrice) {
			this.totalPrice = totalPrice;
		}

		public Bill getBill() {
			return bill;
		}

		public void setBill(Bill bill) {
			this.bill = bill;
		}
	    
		public Integer getQuantity() {
			return quantity;
		}

		public void setQuantity(Integer quantity) {
			this.quantity = quantity;
		}



		@Embeddable
		public static class DrugBillId implements Serializable {
			
			private static final long serialVersionUID = 1L;
			
			private String drugId;
			private String billId;
			
			public DrugBillId() {
				
			}
			
			public DrugBillId(String drugId,String billId) {
				
				super();
				this.drugId = drugId;
				this.billId = billId;
				
			}

			public String getDrugId() {
				return drugId;
			}

			public void setDrugId(String drugId) {
				this.drugId = drugId;
			}

			public String getBillId() {
				return billId;
			}

			public void setBillId(String billId) {
				this.billId = billId;
			}
			
			

			public static long getSerialversionuid() {
				return serialVersionUID;
			}

			@Override
			public int hashCode() {
				final int prime = 31;
				int result = 1;
				result = prime * result + ((drugId == null) ? 0 : drugId.hashCode());
				result = prime * result + ((billId == null) ? 0 : billId.hashCode());
				return result;
			}

			@Override
			public boolean equals(Object obj) {
				if (this == obj)
					return true;
				if (obj == null)
					return false;
				if (getClass() != obj.getClass())
					return false;
				DrugBillId other = (DrugBillId) obj;
				if (drugId == null) {
					if (other.drugId != null)
						return false;
				} else if (!drugId.equals(other.drugId))
					return false;
				if (billId == null) {
					if (other.billId != null)
						return false;
				} else if (!billId.equals(other.billId))
					return false;
				return true;
			}
			
			
		}

	    
	
}
