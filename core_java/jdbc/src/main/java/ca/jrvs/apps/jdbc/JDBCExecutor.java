package ca.jrvs.apps.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

public class JDBCExecutor {
    private static final Logger logger = LogManager.getLogger(JDBCExecutor.class);

    public static void main(String[] args) {
        DatabaseConnectionManager dcm = new DatabaseConnectionManager("localhost", "postgres", "postgres", "password");
        try {
            Connection connection = dcm.getConnection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM information_schema.sql_parts;");
            while (resultSet.next()) {
                logger.info(resultSet.getString(1));
                logger.info(resultSet.getString(2));
                logger.info(resultSet.getString(3));
            }
            statement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
