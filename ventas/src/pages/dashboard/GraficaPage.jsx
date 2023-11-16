import HistogramaGrafica from "../../components/admin/HistogramaGrafica";
import PieGrafica from "../../components/admin/PieGrafica";
// GraficaPage.js



function GraficaPage() {
    return (
        <div>
            <h1 className="mt-4">Graficas</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Graficas</li>
            </ol>
            {/* Contenido del panel de control: gráficos, tablas, widgets, etc. */}


       

            <div className="row">
                <div className="col-lg-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-bar me-1"></i>
                            Histogram Chart
                        </div>
                        <div className="card-body" style={{width:"auto", height:"400px"}}>
                            <HistogramaGrafica></HistogramaGrafica>
                        </div>
                        <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-pie me-1"></i>
                            Pie Chart
                        </div>
                        <div className="card-body" style={{width:"auto", height:"400px"}}>
                            <PieGrafica />
                        </div>
                        <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraficaPage;