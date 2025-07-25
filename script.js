// Global variables
let ordersData = [];
let filteredData = [];
let currentPage = 1;
let recordsPerPage = 100;
let sortColumn = null;
let sortDirection = "asc";
let selectedDateFrom = "";
let selectedDateTo = "";
const bootstrap = window.bootstrap;

// Load data from JSON file
async function loadData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Loaded data:", data); // Debug log
    ordersData = data.orders;
    filteredData = [...ordersData];

    // Populate dropdowns with unique values from data
    populateDropdowns();

    // Initial render
    renderTable();
    initializeTooltips();
    updateRecordCount();
    updatePagination();
  } catch (error) {
    console.error("Error loading data:", error);
    // Use expanded fallback data
    loadFallbackData();
  }
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

// Fallback data in case JSON loading fails
function loadFallbackData() {
  ordersData = [
    {
      id: "EO1073",
      date: "2025-07-03",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17270",
      employeeName: "Md. Parvez Mosharrof",
      assignTeam: "Dev-X",
      profileName: "semexpert_",
      orderId: "FO1D50F12E43",
      monetaryValue: 2400.0,
      clientId: "abgailawuswa",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "https://docs.google...",
      orderStatus: "revision",
      revision: 0,
    },
    {
      id: "EO1193",
      date: "2025-07-25",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17106",
      employeeName: "Zahidul Islam",
      assignTeam: "Nex-Tier",
      profileName: "adsfrenzy",
      orderId: "FO32165C8C907",
      monetaryValue: 336.0,
      clientId: "aleesa56",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "https://docs.google...",
      orderStatus: "wip",
      revision: 0,
    },
    {
      id: "EO1067",
      date: "2025-07-12",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17098",
      employeeName: "Nur Uddin Ovi",
      assignTeam: "Elite-Stack",
      profileName: "ibrahim_365",
      orderId: "FO32146498107",
      monetaryValue: 400.0,
      clientId: "alejandroio125",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "N/A",
      orderStatus: "delivered",
      revision: 0,
    },
    {
      id: "EO1065",
      date: "2025-06-30",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17153",
      employeeName: "Nazibullah Noyon",
      assignTeam: "Dart Layer",
      profileName: "ibrahim_365",
      orderId: "FO5149C5A8B83",
      monetaryValue: 520.0,
      clientId: "ali_alyazji",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "N/A",
      orderStatus: "wip",
      revision: 0,
    },
    {
      id: "EO1064",
      date: "2025-07-15",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17201",
      employeeName: "Rashidul Hasan",
      assignTeam: "Dev-X",
      profileName: "semexpert_",
      orderId: "FO8234A5B9C12",
      monetaryValue: 750.0,
      clientId: "johnsmith123",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "https://docs.google...",
      orderStatus: "nra",
      revision: 1,
    },
    {
      id: "EO1063",
      date: "2025-07-20",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17089",
      employeeName: "Sakib Al Hasan",
      assignTeam: "Nex-Tier",
      profileName: "adsfrenzy",
      orderId: "FO9876B2D4E56",
      monetaryValue: 300.0,
      clientId: "maryjane456",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "https://docs.google...",
      orderStatus: "cancelled",
      revision: 0,
    },
    {
      id: "EO1062",
      date: "2025-07-18",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17145",
      employeeName: "Aminul Islam",
      assignTeam: "Elite-Stack",
      profileName: "ibrahim_365",
      orderId: "FO1234567890A",
      monetaryValue: 680.0,
      clientId: "techguru99",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "https://docs.google...",
      orderStatus: "delivered",
      revision: 0,
    },
    {
      id: "EO1061",
      date: "2025-07-22",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17234",
      employeeName: "Farhana Akter",
      assignTeam: "Dart Layer",
      profileName: "semexpert_",
      orderId: "FO9988776655B",
      monetaryValue: 420.0,
      clientId: "designpro2024",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "N/A",
      orderStatus: "wip",
      revision: 0,
    },
    {
      id: "EO1060",
      date: "2025-07-10",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17167",
      employeeName: "Karim Uddin",
      assignTeam: "Dev-X",
      profileName: "adsfrenzy",
      orderId: "FO5544332211C",
      monetaryValue: 890.0,
      clientId: "webmaster456",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "https://docs.google...",
      orderStatus: "delivered",
      revision: 0,
    },
    {
      id: "EO1059",
      date: "2025-07-08",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17189",
      employeeName: "Sultana Begum",
      assignTeam: "Nex-Tier",
      profileName: "ibrahim_365",
      orderId: "FO7766554433D",
      monetaryValue: 275.0,
      clientId: "startupboss",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "N/A",
      orderStatus: "revision",
      revision: 2,
    },
    {
      id: "EO1058",
      date: "2025-06-28",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17298",
      employeeName: "Abdul Rahman",
      assignTeam: "Elite-Stack",
      profileName: "semexpert_",
      orderId: "FO1122334455E",
      monetaryValue: 650.0,
      clientId: "businessowner",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "https://docs.google...",
      orderStatus: "delivered",
      revision: 0,
    },
    {
      id: "EO1057",
      date: "2025-08-02",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17321",
      employeeName: "Fatima Khatun",
      assignTeam: "Dart Layer",
      profileName: "adsfrenzy",
      orderId: "FO6677889900F",
      monetaryValue: 480.0,
      clientId: "ecommercepro",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "N/A",
      orderStatus: "wip",
      revision: 0,
    },
    {
      id: "EO1056",
      date: "2025-05-15",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17401",
      employeeName: "Mohammad Ali",
      assignTeam: "Dev-X",
      profileName: "semexpert_",
      orderId: "FO3344556677G",
      monetaryValue: 720.0,
      clientId: "digitalagency",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "https://docs.google...",
      orderStatus: "delivered",
      revision: 0,
    },
    {
      id: "EO1055",
      date: "2025-08-10",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17502",
      employeeName: "Ayesha Siddique",
      assignTeam: "Nex-Tier",
      profileName: "ibrahim_365",
      orderId: "FO7788990011H",
      monetaryValue: 380.0,
      clientId: "techstartup",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "N/A",
      orderStatus: "wip",
      revision: 1,
    },
    {
      id: "EO1054",
      date: "2025-04-22",
      assignBy: "Khaled Md Saifullah",
      employeeId: "17603",
      employeeName: "Rafiq Ahmed",
      assignTeam: "Elite-Stack",
      profileName: "adsfrenzy",
      orderId: "FO1122334455I",
      monetaryValue: 590.0,
      clientId: "onlinestore",
      orderLink: "https://www.fiverr.c...",
      insSheetLink: "https://docs.google...",
      orderStatus: "delivered",
      revision: 0,
    },
  ];
  filteredData = [...ordersData];
  populateDropdowns();
  renderTable();
  initializeTooltips();
  updateRecordCount();
  updatePagination();
}

// Date Range Picker Functions
function toggleDateRangePicker() {
  const dropdown = document.getElementById("dateRangeDropdown");
  const isVisible = dropdown.style.display === "block";

  // Hide all other dropdowns first
  document.querySelectorAll(".date-range-dropdown").forEach((d) => {
    if (d !== dropdown) d.style.display = "none";
  });

  dropdown.style.display = isVisible ? "none" : "block";
}

function applyDateRange() {
  const dateFrom = document.getElementById("dateFrom").value;
  const dateTo = document.getElementById("dateTo").value;

  selectedDateFrom = dateFrom;
  selectedDateTo = dateTo;

  // Update the display input
  const displayInput = document.getElementById("filter-dateRange");
  if (dateFrom && dateTo) {
    displayInput.value = `${formatDisplayDate(dateFrom)} - ${formatDisplayDate(
      dateTo
    )}`;
  } else if (dateFrom) {
    displayInput.value = `From ${formatDisplayDate(dateFrom)}`;
  } else if (dateTo) {
    displayInput.value = `Until ${formatDisplayDate(dateTo)}`;
  } else {
    displayInput.value = "";
  }

  // Hide dropdown
  document.getElementById("dateRangeDropdown").style.display = "none";

  // Apply filters
  applyFilters();
}

function clearDateRange() {
  document.getElementById("dateFrom").value = "";
  document.getElementById("dateTo").value = "";
  document.getElementById("filter-dateRange").value = "";
  selectedDateFrom = "";
  selectedDateTo = "";

  // Hide dropdown
  document.getElementById("dateRangeDropdown").style.display = "none";

  // Apply filters
  applyFilters();
}

function formatDisplayDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

// Update record count
function updateRecordCount() {
  const recordCountElement = document.getElementById("recordCount");
  if (recordCountElement) {
    recordCountElement.textContent = `${filteredData.length} records`;
  }
}

// Populate dropdown options from data
function populateDropdowns() {
  // Get unique values for Assign By dropdown
  const uniqueAssignBy = [
    ...new Set(ordersData.map((order) => order.assignBy)),
  ];
  const assignBySelect = document.getElementById("filter-assignBy");
  assignBySelect.innerHTML = '<option value="">All</option>';
  uniqueAssignBy.forEach((assignBy) => {
    const option = document.createElement("option");
    option.value = assignBy;
    option.textContent = assignBy;
    assignBySelect.appendChild(option);
  });
}

// Get status badge HTML with appropriate styling
function getStatusBadge(status) {
  const statusClasses = {
    wip: "status-wip",
    delivered: "status-delivered", // Green
    nra: "status-nra", // Different color (orange/red)
    revision: "status-revision", // Different color
    cancelled: "status-cancelled", // Different color (dark red)
  };

  return `<span class="status-badge ${
    statusClasses[status] || ""
  }">${status.toUpperCase()}</span>`;
}

// Sort data by column
function sortData(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  } else {
    sortColumn = column;
    sortDirection = "asc";
  }

  filteredData.sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];

    // Handle different data types
    if (column === "date") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    } else if (column === "monetaryValue" || column === "revision") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    } else {
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  updateSortIcons();
  currentPage = 1; // Reset to first page after sorting
  renderTable();
  updatePagination();
}

// Update sort icons in headers
function updateSortIcons() {
  // Reset all sort icons
  document.querySelectorAll(".sortable").forEach((th) => {
    th.classList.remove("sort-asc", "sort-desc");
    const icon = th.querySelector(".sort-icon");
    if (icon) {
      icon.className = "fas fa-sort sort-icon";
    }
  });

  // Set active sort icon
  if (sortColumn) {
    const activeHeader = document.querySelector(
      `[data-column="${sortColumn}"]`
    );
    if (activeHeader) {
      activeHeader.classList.add(
        sortDirection === "asc" ? "sort-asc" : "sort-desc"
      );
      const icon = activeHeader.querySelector(".sort-icon");
      if (icon) {
        icon.className = `fas fa-sort-${
          sortDirection === "asc" ? "up" : "down"
        } sort-icon`;
      }
    }
  }
}

// Render table with data and pagination
function renderTable() {
  const tbody = document.getElementById("orderTableBody");
  tbody.innerHTML = "";

  if (filteredData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="14" class="no-data">
          <i class="fas fa-search"></i>
          <p>No orders found matching your criteria</p>
        </td>
      </tr>
    `;
    return;
  }

  // Calculate pagination
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, filteredData.length);
  const pageData = filteredData.slice(startIndex, endIndex);

  pageData.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${formatDate(order.date)}</td>
      <td>${order.assignBy}</td>
      <td>${order.employeeId}</td>
      <td>${order.employeeName}</td>
      <td>${order.assignTeam}</td>
      <td>${order.profileName}</td>
      <td>${order.orderId}</td>
      <td>$${order.monetaryValue.toFixed(1)}</td>
      <td>${order.clientId}</td>
      <td class="link-cell"><a href="#" target="_blank" title="${
        order.orderLink
      }">${order.orderLink}</a></td>
      <td class="link-cell">${
        order.insSheetLink === "N/A"
          ? "N/A"
          : `<a href="#" target="_blank" title="${order.insSheetLink}">${order.insSheetLink}</a>`
      }</td>
      <td>${getStatusBadge(order.orderStatus)}</td>
      <td>${getRevisionBadge(order.revision)}</td>
    `;
    tbody.appendChild(row);
  });
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

// Apply filters
function applyFilters() {
  // Get all filter values
  const filterId = document.getElementById("filter-id").value.toLowerCase();
  const filterAssignBy = document.getElementById("filter-assignBy").value;
  const filterEmployeeId = document
    .getElementById("filter-employeeId")
    .value.toLowerCase();
  const filterEmployeeName = document
    .getElementById("filter-employeeName")
    .value.toLowerCase();
  const filterAssignTeam = document.getElementById("filter-assignTeam").value;
  const filterProfileName = document.getElementById("filter-profileName").value;
  const filterOrderId = document
    .getElementById("filter-orderId")
    .value.toLowerCase();
  const filterValueMin = document.getElementById("filter-valueMin").value;
  const filterValueMax = document.getElementById("filter-valueMax").value;
  const filterClientId = document
    .getElementById("filter-clientId")
    .value.toLowerCase();
  const filterOrderLink = document
    .getElementById("filter-orderLink")
    .value.toLowerCase();
  const filterInsSheetLink = document
    .getElementById("filter-insSheetLink")
    .value.toLowerCase();
  const filterOrderStatus = document.getElementById("filter-orderStatus").value;
  const filterRevision = document.getElementById("filter-revision").value;

  filteredData = ordersData.filter((order) => {
    let matches = true;

    // Apply all filters with AND logic
    if (filterId) {
      matches = matches && order.id.toLowerCase().includes(filterId);
    }

    // Date range filter using global variables
    if (selectedDateFrom || selectedDateTo) {
      const orderDate = order.date; // Order date in YYYY-MM-DD format

      if (selectedDateFrom && selectedDateTo) {
        // Both from and to are set - filter by range
        matches =
          matches &&
          orderDate >= selectedDateFrom &&
          orderDate <= selectedDateTo;
      } else if (selectedDateFrom) {
        // Only from is set - filter from that date onwards
        matches = matches && orderDate >= selectedDateFrom;
      } else if (selectedDateTo) {
        // Only to is set - filter up to that date
        matches = matches && orderDate <= selectedDateTo;
      }
    }

    if (filterAssignBy) {
      matches = matches && order.assignBy === filterAssignBy;
    }

    if (filterEmployeeId) {
      matches =
        matches && order.employeeId.toLowerCase().includes(filterEmployeeId);
    }

    if (filterEmployeeName) {
      matches =
        matches &&
        order.employeeName.toLowerCase().includes(filterEmployeeName);
    }

    if (filterAssignTeam) {
      matches = matches && order.assignTeam === filterAssignTeam;
    }

    if (filterProfileName) {
      matches = matches && order.profileName === filterProfileName;
    }

    if (filterOrderId) {
      matches = matches && order.orderId.toLowerCase().includes(filterOrderId);
    }

    if (filterValueMin) {
      matches =
        matches && order.monetaryValue >= Number.parseFloat(filterValueMin);
    }

    if (filterValueMax) {
      matches =
        matches && order.monetaryValue <= Number.parseFloat(filterValueMax);
    }

    if (filterClientId) {
      matches =
        matches && order.clientId.toLowerCase().includes(filterClientId);
    }

    if (filterOrderLink) {
      matches =
        matches && order.orderLink.toLowerCase().includes(filterOrderLink);
    }

    if (filterInsSheetLink) {
      matches =
        matches &&
        order.insSheetLink.toLowerCase().includes(filterInsSheetLink);
    }

    if (filterOrderStatus) {
      matches = matches && order.orderStatus === filterOrderStatus;
    }

    if (filterRevision) {
      matches = matches && order.revision === Number.parseInt(filterRevision);
    }

    return matches;
  });

  currentPage = 1; // Reset to first page after filtering
  updateRecordCount();
  renderTable();
  updatePagination();
}

// Clear all filters
function clearAllFilters() {
  // Clear all filter inputs
  document.querySelectorAll(".header-filter").forEach((input) => {
    input.value = "";
  });

  // Clear date range
  selectedDateFrom = "";
  selectedDateTo = "";
  document.getElementById("dateFrom").value = "";
  document.getElementById("dateTo").value = "";
  document.getElementById("filter-dateRange").value = "";

  // Reset data
  filteredData = [...ordersData];
  currentPage = 1;
  updateRecordCount();
  renderTable();
  updatePagination();
}

// Cancel all filters (same as clear but with different name for the red button)
function cancelAllFilters() {
  clearAllFilters();
}

// Update pagination
function updatePagination() {
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startRecord =
    totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  // Update pagination info
  const paginationInfo = document.getElementById("paginationInfo");
  paginationInfo.textContent = `Showing ${startRecord}-${endRecord} of ${totalRecords} records`;

  // Generate pagination buttons
  const paginationNav = document.getElementById("paginationNav");
  paginationNav.innerHTML = "";

  if (totalPages <= 1) {
    return; // No pagination needed
  }

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${
    currentPage - 1
  })">Previous</a>`;
  paginationNav.appendChild(prevLi);

  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    const firstLi = document.createElement("li");
    firstLi.className = "page-item";
    firstLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(1)">1</a>`;
    paginationNav.appendChild(firstLi);

    if (startPage > 2) {
      const ellipsisLi = document.createElement("li");
      ellipsisLi.className = "page-item disabled";
      ellipsisLi.innerHTML = `<span class="page-link">...</span>`;
      paginationNav.appendChild(ellipsisLi);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageLi = document.createElement("li");
    pageLi.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
    paginationNav.appendChild(pageLi);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsisLi = document.createElement("li");
      ellipsisLi.className = "page-item disabled";
      ellipsisLi.innerHTML = `<span class="page-link">...</span>`;
      paginationNav.appendChild(ellipsisLi);
    }

    const lastLi = document.createElement("li");
    lastLi.className = "page-item";
    lastLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${totalPages})">${totalPages}</a>`;
    paginationNav.appendChild(lastLi);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${
    currentPage + 1
  })">Next</a>`;
  paginationNav.appendChild(nextLi);
}

// Change page
function changePage(page) {
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderTable();
    updatePagination();
  }
}

// Change records per page
function changeRecordsPerPage() {
  recordsPerPage = Number.parseInt(
    document.getElementById("recordsPerPage").value
  );
  currentPage = 1;
  renderTable();
  updatePagination();
}

// Debounce function for search inputs
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize event listeners
function initializeEventListeners() {
  // Header filters with debounce for text inputs
  const debouncedFilter = debounce(applyFilters, 300);

  document.querySelectorAll(".header-filter").forEach((input) => {
    if (input.type === "text" || input.type === "number") {
      input.addEventListener("input", debouncedFilter);
    } else {
      input.addEventListener("change", applyFilters);
    }
  });

  // Date range picker click handler
  document
    .getElementById("filter-dateRange")
    .addEventListener("click", toggleDateRangePicker);

  // Close dropdown when clicking outside
  document.addEventListener("click", (event) => {
    const dateRangeContainer = document.querySelector(
      ".date-range-picker-container"
    );
    const dropdown = document.getElementById("dateRangeDropdown");

    if (!dateRangeContainer.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });

  // Records per page dropdown
  document
    .getElementById("recordsPerPage")
    .addEventListener("change", changeRecordsPerPage);

  // Sorting functionality
  document.querySelectorAll(".sortable").forEach((th) => {
    th.addEventListener("click", (e) => {
      // Don't sort if clicking on filter input or date range picker
      if (
        e.target.classList.contains("header-filter") ||
        e.target.closest(".date-range-picker-container")
      ) {
        return;
      }
      const column = th.getAttribute("data-column");
      sortData(column);
    });
  });
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  initializeEventListeners();
});

// Add new function for revision badges
function getRevisionBadge(revision) {
  return `<span class="revision-badge">${revision}</span>`;
}

// Export functions for potential external use
window.OrderManagement = {
  loadData,
  applyFilters,
  clearAllFilters,
  renderTable,
  sortData,
  changePage,
  changeRecordsPerPage,
  toggleDateRangePicker,
  applyDateRange,
  clearDateRange,
};
