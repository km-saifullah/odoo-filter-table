// Global variables
let ordersData = [];
let filteredData = [];
let sortColumn = null;
let sortDirection = "asc";
const activeIndividualFilters = new Set();
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

    // Update total records count
    updateRecordCount();
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
      insSheetLink: "https://docs.google...",
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
}

// Add function to update record count
function updateRecordCount() {
  const totalRecordsElement = document.getElementById("totalRecords");
  if (totalRecordsElement) {
    totalRecordsElement.textContent = filteredData.length;
  }
}

// Populate dropdown options from data
function populateDropdowns() {
  // Get unique values for Assign By dropdown
  const uniqueAssignBy = [
    ...new Set(ordersData.map((order) => order.assignBy)),
  ];
  const assignBySelect = document.getElementById("individual-filter-assignBy");
  assignBySelect.innerHTML = '<option value="">All</option>';
  uniqueAssignBy.forEach((assignBy) => {
    const option = document.createElement("option");
    option.value = assignBy;
    option.textContent = assignBy;
    assignBySelect.appendChild(option);
  });
}

// Handle individual filter icon clicks
function handleFilterIconClick(column) {
  // Hide all other individual filter rows
  document.querySelectorAll(".individual-filter-row").forEach((row) => {
    if (row.id !== `filter-row-${column}`) {
      row.style.display = "none";
    }
  });

  // Toggle the clicked filter row
  const filterRow = document.getElementById(`filter-row-${column}`);
  if (filterRow.style.display === "none") {
    filterRow.style.display = "table-row";

    // Focus on the first input in the filter row
    setTimeout(() => {
      const firstInput = filterRow.querySelector(".individual-filter-input");
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  } else {
    filterRow.style.display = "none";
  }
}

// Clear individual filter
function clearIndividualFilter(column) {
  // Clear the filter inputs for this column
  if (column === "date") {
    document.getElementById("individual-filter-date").value = "";
  } else if (column === "monetaryValue") {
    document.getElementById("individual-filter-valueMin").value = "";
    document.getElementById("individual-filter-valueMax").value = "";
  } else {
    const input = document.getElementById(`individual-filter-${column}`);
    if (input) {
      input.value = "";
    }
  }

  // Hide the filter row
  const filterRow = document.getElementById(`filter-row-${column}`);
  if (filterRow) {
    filterRow.style.display = "none";
  }

  // Remove from active filters
  activeIndividualFilters.delete(column);

  // Apply filters
  applyFilters();
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
  renderTable();
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

// Update filter icon states
function updateFilterIcons() {
  // Reset all filter icons
  document.querySelectorAll(".filter-icon").forEach((icon) => {
    icon.classList.remove("active", "filter-active");
  });

  activeIndividualFilters.clear();

  // Check which individual filters are active
  const filterChecks = [
    { id: "individual-filter-id", column: "id" },
    { id: "individual-filter-date", column: "date" },
    { id: "individual-filter-assignBy", column: "assignBy" },
    { id: "individual-filter-employeeId", column: "employeeId" },
    { id: "individual-filter-employeeName", column: "employeeName" },
    { id: "individual-filter-assignTeam", column: "assignTeam" },
    { id: "individual-filter-profileName", column: "profileName" },
    { id: "individual-filter-orderId", column: "orderId" },
    { id: "individual-filter-valueMin", column: "monetaryValue" },
    { id: "individual-filter-valueMax", column: "monetaryValue" },
    { id: "individual-filter-clientId", column: "clientId" },
    { id: "individual-filter-orderLink", column: "orderLink" },
    { id: "individual-filter-insSheetLink", column: "insSheetLink" },
    { id: "individual-filter-orderStatus", column: "orderStatus" },
    { id: "individual-filter-revision", column: "revision" },
  ];

  filterChecks.forEach(({ id, column }) => {
    const element = document.getElementById(id);
    if (element && element.value) {
      activeIndividualFilters.add(column);
    }
  });

  // Add active class to filter icons
  activeIndividualFilters.forEach((column) => {
    const filterIcon = document.querySelector(
      `.filter-icon[data-column="${column}"]`
    );
    if (filterIcon) {
      filterIcon.classList.add("active", "filter-active");
    }
  });
}

// Render table with data
function renderTable(data = filteredData) {
  const tbody = document.getElementById("orderTableBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
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

  data.forEach((order) => {
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

// Update statistics cards
function updateStats(data) {
  // Function removed as stats cards are no longer present
}

// Update the applyFilters function to remove top filters and fix date filtering
function applyFilters() {
  // Individual column filters only
  const individualFilterId = document
    .getElementById("individual-filter-id")
    .value.toLowerCase();
  const individualFilterDate = document.getElementById(
    "individual-filter-date"
  ).value;
  const individualFilterAssignBy = document.getElementById(
    "individual-filter-assignBy"
  ).value;
  const individualFilterEmployeeId = document
    .getElementById("individual-filter-employeeId")
    .value.toLowerCase();
  const individualFilterEmployeeName = document
    .getElementById("individual-filter-employeeName")
    .value.toLowerCase();
  const individualFilterAssignTeam = document.getElementById(
    "individual-filter-assignTeam"
  ).value;
  const individualFilterProfileName = document.getElementById(
    "individual-filter-profileName"
  ).value;
  const individualFilterOrderId = document
    .getElementById("individual-filter-orderId")
    .value.toLowerCase();
  const individualFilterValueMin = document.getElementById(
    "individual-filter-valueMin"
  ).value;
  const individualFilterValueMax = document.getElementById(
    "individual-filter-valueMax"
  ).value;
  const individualFilterClientId = document
    .getElementById("individual-filter-clientId")
    .value.toLowerCase();
  const individualFilterOrderLink = document
    .getElementById("individual-filter-orderLink")
    .value.toLowerCase();
  const individualFilterInsSheetLink = document
    .getElementById("individual-filter-insSheetLink")
    .value.toLowerCase();
  const individualFilterOrderStatus = document.getElementById(
    "individual-filter-orderStatus"
  ).value;
  const individualFilterRevision = document.getElementById(
    "individual-filter-revision"
  ).value;

  filteredData = ordersData.filter((order) => {
    let matches = true;

    // Individual column filters (multiple filters work together with AND logic)
    if (individualFilterId) {
      matches = matches && order.id.toLowerCase().includes(individualFilterId);
    }

    // Single date filter - exact date match
    if (individualFilterDate) {
      matches = matches && order.date === individualFilterDate;
    }

    if (individualFilterAssignBy) {
      matches = matches && order.assignBy === individualFilterAssignBy;
    }

    if (individualFilterEmployeeId) {
      matches =
        matches &&
        order.employeeId.toLowerCase().includes(individualFilterEmployeeId);
    }

    if (individualFilterEmployeeName) {
      matches =
        matches &&
        order.employeeName.toLowerCase().includes(individualFilterEmployeeName);
    }

    if (individualFilterAssignTeam) {
      matches = matches && order.assignTeam === individualFilterAssignTeam;
    }

    if (individualFilterProfileName) {
      matches = matches && order.profileName === individualFilterProfileName;
    }

    if (individualFilterOrderId) {
      matches =
        matches &&
        order.orderId.toLowerCase().includes(individualFilterOrderId);
    }

    if (individualFilterValueMin) {
      matches =
        matches &&
        order.monetaryValue >= Number.parseFloat(individualFilterValueMin);
    }

    if (individualFilterValueMax) {
      matches =
        matches &&
        order.monetaryValue <= Number.parseFloat(individualFilterValueMax);
    }

    if (individualFilterClientId) {
      matches =
        matches &&
        order.clientId.toLowerCase().includes(individualFilterClientId);
    }

    if (individualFilterOrderLink) {
      matches =
        matches &&
        order.orderLink.toLowerCase().includes(individualFilterOrderLink);
    }

    if (individualFilterInsSheetLink) {
      matches =
        matches &&
        order.insSheetLink.toLowerCase().includes(individualFilterInsSheetLink);
    }

    if (individualFilterOrderStatus) {
      matches = matches && order.orderStatus === individualFilterOrderStatus;
    }

    if (individualFilterRevision) {
      matches =
        matches && order.revision === Number.parseInt(individualFilterRevision);
    }

    return matches;
  });

  updateFilterIcons();
  renderTable(filteredData);
}

// Clear all filters
function clearAllFilters() {
  // Clear all individual filters
  document.querySelectorAll(".individual-filter-input").forEach((input) => {
    input.value = "";
  });

  // Hide all individual filter rows
  document.querySelectorAll(".individual-filter-row").forEach((row) => {
    row.style.display = "none";
  });

  // Reset data and sorting
  filteredData = [...ordersData];
  activeIndividualFilters.clear();
  updateFilterIcons();
  renderTable(filteredData);
}

// Cancel all filters (same as clear but with different name for the red button)
function cancelAllFilters() {
  clearAllFilters();
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
  // Individual column filters with debounce for text inputs
  const debouncedFilter = debounce(applyFilters, 300);

  document.querySelectorAll(".individual-filter-input").forEach((input) => {
    if (input.type === "text" || input.type === "number") {
      input.addEventListener("input", debouncedFilter);
    } else {
      input.addEventListener("change", applyFilters);
    }
  });

  // Sorting functionality
  document.querySelectorAll(".sortable").forEach((th) => {
    th.addEventListener("click", (e) => {
      // Don't sort if clicking on filter icon
      if (e.target.classList.contains("filter-icon")) {
        return;
      }
      const column = th.getAttribute("data-column");
      sortData(column);
    });
  });

  // Filter icon clicks
  document.querySelectorAll(".filter-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      const column = icon.getAttribute("data-column");
      handleFilterIconClick(column);
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
  updateStats,
  sortData,
  handleFilterIconClick,
  clearIndividualFilter,
};
